const mongoose = require('mongoose');
const path = require('path');
const Facility = require('../models/Facility');

// Load environment variables from the correct path
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

const additionalFacilities = [
  {
    name: "World Wide Recyclers – E-Waste Recycling Pvt. Ltd.",
    description: "Authorized e-waste recycling center with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [77.7100, 28.9800], // [longitude, latitude]
      address: "Khasra No. 745, Hapur Road, Village Allipur Jijmana, Industrial Area, Meerut (U.P) - 250002",
      city: "Meerut",
      state: "Uttar Pradesh"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 9,
        close: 18
      },
      {
        day: 2,
        open: 9,
        close: 18
      },
      {
        day: 3,
        open: 9,
        close: 18
      },
      {
        day: 4,
        open: 9,
        close: 18
      },
      {
        day: 5,
        open: 9,
        close: 18
      }
    ],
    contactInfo: {
      phone: "1800 419 7175",
      email: "info@worldwiderecyclers.com"
    },
    rating: 4.5,
    verified: true
  },
  {
    name: "World Green E-Waste Recycling",
    description: "Professional e-waste recycling facility with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [77.7100, 28.9800],
      address: "Khasra No.- 31,39,40,41,42, Village-Alipur Jijmana, Tehsil-Meerut, Meerut – 250501",
      city: "Meerut",
      state: "Uttar Pradesh"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 9,
        close: 18
      },
      {
        day: 2,
        open: 9,
        close: 18
      },
      {
        day: 3,
        open: 9,
        close: 18
      },
      {
        day: 4,
        open: 9,
        close: 18
      },
      {
        day: 5,
        open: 9,
        close: 18
      }
    ],
    contactInfo: {
      phone: "+91 9870722728",
      email: "info@worldgreenewaste.com"
    },
    rating: 4.4,
    verified: true
  },
  {
    name: "RecycleKaro (Evergreen Recyclekaro India Pvt. Ltd.)",
    description: "Comprehensive e-waste recycling facility with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [73.0060, 19.1076],
      address: "Office 1603, 16th Floor, Atrium B, Rupa Solitaire, Millennium Business Park, Mahape, Navi Mumbai - 400710",
      city: "Navi Mumbai",
      state: "Maharashtra"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 10,
        close: 18
      },
      {
        day: 2,
        open: 10,
        close: 18
      },
      {
        day: 3,
        open: 10,
        close: 18
      },
      {
        day: 4,
        open: 10,
        close: 18
      },
      {
        day: 5,
        open: 10,
        close: 18
      }
    ],
    contactInfo: {
      phone: "+91-9967310007",
      email: "info@recyclekaro.com"
    },
    rating: 4.6,
    verified: true
  },
  {
    name: "E-Waste Recyclers India (EWRI)",
    description: "Professional e-waste recycling facility with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [77.2513, 28.5245],
      address: "EWRI House, A-46, Okhla Industrial Area Phase-I, New Delhi - 110020",
      city: "New Delhi",
      state: "Delhi"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 9,
        close: 18
      },
      {
        day: 2,
        open: 9,
        close: 18
      },
      {
        day: 3,
        open: 9,
        close: 18
      },
      {
        day: 4,
        open: 9,
        close: 18
      },
      {
        day: 5,
        open: 9,
        close: 18
      }
    ],
    contactInfo: {
      phone: "+91-9700797007",
      email: "info@ewri.in"
    },
    rating: 4.5,
    verified: true
  },
  {
    name: "Zebronics E-Waste Collection Center – Trichy",
    description: "Authorized e-waste collection center with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [78.6965, 10.8130],
      address: "No D2, Second Floor KPRS Towers, Tennur High Road, Tennur, Trichy - 620017",
      city: "Trichy",
      state: "Tamil Nadu"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 10,
        close: 18
      },
      {
        day: 2,
        open: 10,
        close: 18
      },
      {
        day: 3,
        open: 10,
        close: 18
      },
      {
        day: 4,
        open: 10,
        close: 18
      },
      {
        day: 5,
        open: 10,
        close: 18
      }
    ],
    contactInfo: {
      phone: "0431-4051199",
      email: "info@zebronics.com"
    },
    rating: 4.3,
    verified: true
  },
  {
    name: "Eco-Birdd Recycling Center Pvt. Ltd.",
    description: "Professional e-waste recycling facility with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [77.5280, 12.9440],
      address: "No.185, 1st Cross, 1st Main Azeez Sait Industrial Estate, Nayandahalli, Bangalore - 560039",
      city: "Bangalore",
      state: "Karnataka"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 9,
        close: 18
      },
      {
        day: 2,
        open: 9,
        close: 18
      },
      {
        day: 3,
        open: 9,
        close: 18
      },
      {
        day: 4,
        open: 9,
        close: 18
      },
      {
        day: 5,
        open: 9,
        close: 18
      }
    ],
    contactInfo: {
      phone: "+91 74000 55174",
      email: "info@ecobirdd.com"
    },
    rating: 4.4,
    verified: true
  },
  {
    name: "3R Recycler",
    description: "Comprehensive e-waste recycling facility with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [77.2773, 28.6270],
      address: "Office No. 502, 5th Floor, DDA Building, Laxmi Nagar District Center, Delhi – 110092",
      city: "Delhi",
      state: "Delhi"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 10,
        close: 18
      },
      {
        day: 2,
        open: 10,
        close: 18
      },
      {
        day: 3,
        open: 10,
        close: 18
      },
      {
        day: 4,
        open: 10,
        close: 18
      },
      {
        day: 5,
        open: 10,
        close: 18
      }
    ],
    contactInfo: {
      phone: "1800-212-8632",
      email: "info@3rrecycler.com"
    },
    rating: 4.5,
    verified: true
  },
  {
    name: "E-Waste Recycling India",
    description: "Professional e-waste recycling facility with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [72.8468, 19.1197],
      address: "615, Pearl Plaza Premises, Andheri West, Mumbai – 400058",
      city: "Mumbai",
      state: "Maharashtra"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 10,
        close: 18
      },
      {
        day: 2,
        open: 10,
        close: 18
      },
      {
        day: 3,
        open: 10,
        close: 18
      },
      {
        day: 4,
        open: 10,
        close: 18
      },
      {
        day: 5,
        open: 10,
        close: 18
      }
    ],
    contactInfo: {
      phone: "+91 97690 77008",
      email: "info@ewasterecyclingindia.com"
    },
    rating: 4.6,
    verified: true
  },
  {
    name: "SKV E-Waste Recycling Pvt. Ltd.",
    description: "Professional e-waste recycling facility with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [80.2110, 13.0500],
      address: "13/1, Alagiri Nagar First Street, Vadapalani, Chennai - 600026",
      city: "Chennai",
      state: "Tamil Nadu"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 10,
        close: 18
      },
      {
        day: 2,
        open: 10,
        close: 18
      },
      {
        day: 3,
        open: 10,
        close: 18
      },
      {
        day: 4,
        open: 10,
        close: 18
      },
      {
        day: 5,
        open: 10,
        close: 18
      }
    ],
    contactInfo: {
      phone: "+91 9514751475",
      email: "info@skvewaste.com"
    },
    rating: 4.4,
    verified: true
  },
  {
    name: "Clean E-Waste Recycling",
    description: "Professional e-waste recycling facility with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [72.8468, 19.1197],
      address: "Subhash Nagar, No. 01, Atul Building, MIDC, Andheri (East), Mumbai - 400093",
      city: "Mumbai",
      state: "Maharashtra"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 10,
        close: 18
      },
      {
        day: 2,
        open: 10,
        close: 18
      },
      {
        day: 3,
        open: 10,
        close: 18
      },
      {
        day: 4,
        open: 10,
        close: 18
      },
      {
        day: 5,
        open: 10,
        close: 18
      }
    ],
    contactInfo: {
      phone: "+91 98335 62539",
      email: "info@cleanewaste.com"
    },
    rating: 4.5,
    verified: true
  },
  {
    "name": "M/s. Tritech Systems",
    "description": "Authorized e-waste recycling center with estimated capacity of 100 units",
    "location": {
      "type": "Point",
      "coordinates": [80.2200, 13.0700],
      "address": "",
      "city": "Chennai",
      "state": "Tamil Nadu"
    },
    "wasteTypes": ["computers", "phones", "batteries", "appliances"],
    "operatingHours": [
      { "day": 1, "open": 9, "close": 18 },
      { "day": 2, "open": 9, "close": 18 },
      { "day": 3, "open": 9, "close": 18 },
      { "day": 4, "open": 9, "close": 18 },
      { "day": 5, "open": 9, "close": 18 }
    ],
    "contactInfo": {
      "phone": "42617179",
      "email": "tri-abdullah@yahoo.com"
    },
    "rating": 4.2,
    "verified": true
  },
  {
    "name": "M/s. Aer World Wide",
    "description": "Authorized e-waste recycling center with estimated capacity of 100 units",
    "location": {
      "type": "Point",
      "coordinates": [80.2200, 13.0700],
      "address": "2B, 2C, 2D, 2E, Elanthanjeri Village, Madhavaram Taluk,",
      "city": "Chennai",
      "state": "Tamil Nadu"
    },
    "wasteTypes": ["computers", "phones", "batteries", "appliances"],
    "operatingHours": [
      { "day": 1, "open": 9, "close": 18 },
      { "day": 2, "open": 9, "close": 18 },
      { "day": 3, "open": 9, "close": 18 },
      { "day": 4, "open": 9, "close": 18 },
      { "day": 5, "open": 9, "close": 18 }
    ],
    "contactInfo": {
      "phone": "0000000000",
      "email": "info@example.com"
    },
    "rating": 4.2,
    "verified": true
  },
  {
    "name": "M/s. Green E Waste",
    "description": "Authorized e-waste recycling center with estimated capacity of 100 units",
    "location": {
      "type": "Point",
      "coordinates": [80.2200, 13.0700],
      "address": "No.33, Geazon, Aynambakkam Housing colony, Ayanamabakkam Village,Ambattur",
      "city": "Chennai",
      "state": "Tamil Nadu"
    },
    "wasteTypes": ["computers", "phones", "batteries", "appliances"],
    "operatingHours": [
      { "day": 1, "open": 9, "close": 18 },
      { "day": 2, "open": 9, "close": 18 },
      { "day": 3, "open": 9, "close": 18 },
      { "day": 4, "open": 9, "close": 18 },
      { "day": 5, "open": 9, "close": 18 }
    ],
    "contactInfo": {
      "phone": "26534690",
      "email": "parvez@greenewaste.in"
    },
    "rating": 4.2,
    "verified": true
  }
];

async function seedAdditionalFacilities() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Insert new facilities
    const facilities = await Facility.insertMany(additionalFacilities);
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

seedAdditionalFacilities(); 