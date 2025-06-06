const mongoose = require('mongoose');
const Facility = require('../models/Facility');
require('dotenv').config();

const sampleFacilities = [
  {
    name: "Green Tech Recycling Center",
    description: "A modern facility for electronic waste recycling",
    location: {
      type: "Point",
      coordinates: [78.1140983, 9.9261153], // [longitude, latitude]
      address: "123 Tech Park, Madurai"
    },
    wasteTypes: ["computers", "phones", "batteries"],
    operatingHours: [
      {
        day: 1, // Monday
        open: 9,
        close: 18
      },
      {
        day: 2, // Tuesday
        open: 9,
        close: 18
      },
      {
        day: 3, // Wednesday
        open: 9,
        close: 18
      },
      {
        day: 4, // Thursday
        open: 9,
        close: 18
      },
      {
        day: 5, // Friday
        open: 9,
        close: 18
      }
    ],
    contactInfo: {
      phone: "044-12345678",
      email: "info@greentech.com"
    }
  },
  {
    name: "Eco Solutions Hub",
    description: "Comprehensive e-waste management facility",
    location: {
      type: "Point",
      coordinates: [78.1240983, 9.9361153], // [longitude, latitude]
      address: "456 Green Street, Madurai"
    },
    wasteTypes: ["appliances", "computers", "phones"],
    operatingHours: [
      {
        day: 1, // Monday
        open: 8,
        close: 20
      },
      {
        day: 2, // Tuesday
        open: 8,
        close: 20
      },
      {
        day: 3, // Wednesday
        open: 8,
        close: 20
      },
      {
        day: 4, // Thursday
        open: 8,
        close: 20
      },
      {
        day: 5, // Friday
        open: 8,
        close: 20
      },
      {
        day: 6, // Saturday
        open: 9,
        close: 15
      }
    ],
    contactInfo: {
      phone: "044-87654321",
      email: "contact@ecosolutions.com"
    }
  }
];

async function seedFacilities() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing facilities
    await Facility.deleteMany({});
    console.log('Cleared existing facilities');

    // Insert new facilities
    const facilities = await Facility.insertMany(sampleFacilities);
    console.log(`Added ${facilities.length} facilities to the database`);

    // Verify the facilities were added
    const count = await Facility.countDocuments();
    console.log(`Total facilities in database: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding facilities:', error);
    process.exit(1);
  }
}

seedFacilities(); 