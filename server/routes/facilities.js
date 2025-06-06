const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');

// Search facilities
router.get('/', async (req, res) => {
  try {
    console.log('Facility search request received:', req.query);
    const { location, wasteType, openNow, city } = req.query;

    // Parse location coordinates
    let lat, lng;
    if (location) {
      try {
        [lat, lng] = location.split(',').map(Number);
        console.log('Parsed coordinates:', { lat, lng });
      } catch (error) {
        console.error('Error parsing location coordinates:', error);
        return res.status(400).json({ error: 'Invalid location format' });
      }
    }
    
    // Build query
    const query = {};
    console.log('Initial query:', query);
    
    // Add city/state filter if provided
    if (city) {
      console.log('Searching for city:', city);
      // Create a case-insensitive regex for the city/state
      const cityRegex = new RegExp(city, 'i');
      query.$or = [
        { 'location.city': cityRegex },
        { 'location.state': cityRegex }
      ];
      console.log('Search query:', JSON.stringify(query, null, 2));
    }
    
    // Add waste type filter if provided
    if (wasteType) {
      query.wasteTypes = wasteType;
      console.log('Added waste type filter:', query);
    }

    // Add open now filter if provided
    if (openNow === 'true') {
      const now = new Date();
      const currentHour = now.getHours();
      const currentDay = now.getDay();
      
      query['operatingHours.day'] = currentDay;
      query['operatingHours.open'] = { $lte: currentHour };
      query['operatingHours.close'] = { $gt: currentHour };
      console.log('Added open now filter:', query);
    }

    // First, check if we have any facilities at all
    const totalFacilities = await Facility.countDocuments();
    console.log(`Total facilities in database: ${totalFacilities}`);

    // Find all facilities
    let facilities = await Facility.find(query);
    console.log(`Found ${facilities.length} facilities matching query`);
    console.log('Facilities found:', facilities.map(f => ({
      name: f.name,
      city: f.location.city,
      state: f.location.state
    })));
    
    // Calculate distances and sort if location is provided
    if (lat && lng) {
      facilities = facilities.map(facility => {
        const facilityDistance = calculateDistance(
          lat,
          lng,
          facility.location.coordinates[1],
          facility.location.coordinates[0]
        );
        return {
          ...facility.toObject(),
          distance: facilityDistance
        };
      });

      // Sort by distance
      facilities.sort((a, b) => a.distance - b.distance);
    }

    res.json(facilities);
  } catch (error) {
    console.error('Error searching facilities:', error);
    res.status(500).json({ error: 'Error searching facilities' });
  }
});

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Add a new facility
router.post('/', async (req, res) => {
  try {
    console.log('Creating new facility:', req.body);
    const facility = new Facility(req.body);
    await facility.save();
    console.log('Facility created successfully:', facility._id);
    res.status(201).json(facility);
  } catch (error) {
    console.error('Error adding facility:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      validationErrors: error.errors
    });
    res.status(400).json({ 
      error: 'Error adding facility',
      details: error.message,
      validationErrors: error.errors
    });
  }
});

module.exports = router; 