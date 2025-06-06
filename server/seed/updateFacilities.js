const mongoose = require('mongoose');
const path = require('path');
const Facility = require('../models/Facility');

// Load environment variables from the correct path
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Log environment variables (excluding sensitive data)
console.log('Environment check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'URI is set' : 'URI is missing');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('PORT:', process.env.PORT || 'not set');

const facilityUpdates = [
  {
    name: "Madurai E-Waste Recycling Center",
    description: "A modern facility for electronic waste recycling",
    location: {
      type: "Point",
      coordinates: [78.1140983, 9.9261153], // [longitude, latitude]
      address: "123 Tech Park, Madurai"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
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
      },
      {
        day: 6, // Saturday
        open: 9,
        close: 14
      }
    ],
    contactInfo: {
      phone: "044-12345678",
      email: "info@maduraie-waste.com"
    }
  },
  {
    name: "Green Tech Solutions",
    description: "Comprehensive e-waste management facility",
    location: {
      type: "Point",
      coordinates: [78.1240983, 9.9361153], // [longitude, latitude]
      address: "456 Green Street, Madurai"
    },
    wasteTypes: ["computers", "phones", "batteries"],
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
      }
    ],
    contactInfo: {
      phone: "044-87654321",
      email: "contact@greentech.com"
    }
  },
  {
    name: "Eco Recycling Hub",
    description: "Environmentally conscious e-waste recycling",
    location: {
      type: "Point",
      coordinates: [78.1040983, 9.9161153], // [longitude, latitude]
      address: "789 Eco Road, Madurai"
    },
    wasteTypes: ["appliances", "computers", "phones"],
    operatingHours: [
      {
        day: 1, // Monday
        open: 9,
        close: 17
      },
      {
        day: 2, // Tuesday
        open: 9,
        close: 17
      },
      {
        day: 3, // Wednesday
        open: 9,
        close: 17
      },
      {
        day: 4, // Thursday
        open: 9,
        close: 17
      },
      {
        day: 5, // Friday
        open: 9,
        close: 17
      }
    ],
    contactInfo: {
      phone: "044-98765432",
      email: "info@ecorecycling.com"
    }
  }
];

async function updateFacilities() {
  try {
    console.log('\nAttempting to connect to MongoDB...');
    console.log('Connection URI:', process.env.MONGODB_URI);
    
    // Set mongoose debug mode
    mongoose.set('debug', true);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Successfully connected to MongoDB');

    // Clear existing facilities
    console.log('\nClearing existing facilities...');
    await Facility.deleteMany({});
    console.log('Successfully cleared existing facilities');

    // Insert updated facilities
    console.log('\nInserting new facilities...');
    const facilities = await Facility.insertMany(facilityUpdates);
    console.log(`Successfully added ${facilities.length} facilities to the database`);

    // Verify the facilities were added
    const count = await Facility.countDocuments();
    console.log(`\nVerification: Total facilities in database: ${count}`);

    // Log each facility to verify data
    console.log('\nFacility Details:');
    for (const facility of facilities) {
      console.log('\nFacility:', {
        name: facility.name,
        location: facility.location,
        wasteTypes: facility.wasteTypes,
        operatingHours: facility.operatingHours,
        contactInfo: facility.contactInfo
      });
    }

    console.log('\nDatabase update completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('\nError updating facilities:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    process.exit(1);
  }
}

updateFacilities(); 