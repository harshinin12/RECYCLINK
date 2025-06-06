const mongoose = require('mongoose');
const path = require('path');
const Facility = require('../models/Facility');

// Load environment variables from the correct path
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Use the MONGODB_URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

const realFacilities = [
  {
    name: "Green IT Recycling Center Pvt. Ltd.",
    description: "Authorized e-waste recycling center with capacity of 100 units",
    location: {
      type: "Point",
      coordinates: [73.8576905, 18.5150587], // [longitude, latitude]
      address: "5 Ganeshprasad IInd Floor, 890, Sadashiv Peth, Pune, Maharashtra 411030"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1, // Monday
        open: 10,
        close: 19
      },
      {
        day: 2, // Tuesday
        open: 10,
        close: 19
      },
      {
        day: 3, // Wednesday
        open: 10,
        close: 19
      },
      {
        day: 4, // Thursday
        open: 10,
        close: 19
      },
      {
        day: 5, // Friday
        open: 10,
        close: 19
      },
      {
        day: 6, // Saturday
        open: 10,
        close: 19
      }
    ],
    contactInfo: {
      phone: "09822356062",
      email: "info@greenitrecycling.com"
    },
    rating: 4.5,
    verified: true
  },
  {
    name: "Green e-Bin E-waste Recycling",
    description: "E-waste recycling facility with capacity of 50 units",
    location: {
      type: "Point",
      coordinates: [75.4746199, 19.9464019],
      address: "B-18, MIDC Industrial Area, Chilkalthana, Aurangabad, Maharashtra 431006"
    },
    wasteTypes: ["computers", "phones", "batteries"],
    operatingHours: [
      {
        day: 1,
        open: 9,
        close: 19
      },
      {
        day: 2,
        open: 9,
        close: 19
      },
      {
        day: 3,
        open: 9,
        close: 19
      },
      {
        day: 4,
        open: 9,
        close: 19
      },
      {
        day: 5,
        open: 9,
        close: 19
      }
    ],
    contactInfo: {
      phone: "09921040501",
      email: "info@greenebin.com"
    },
    rating: 4.0,
    verified: false
  },
  {
    name: "ERECON RECYCLING",
    description: "Professional e-waste recycling facility with capacity of 80 units",
    location: {
      type: "Point",
      coordinates: [75.4132847, 19.8675870],
      address: "Shri Krishna Colony, Chilkalthana, Aurangabad, Maharashtra 431007"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 9,
        close: 17
      },
      {
        day: 2,
        open: 9,
        close: 17
      },
      {
        day: 3,
        open: 9,
        close: 17
      },
      {
        day: 4,
        open: 9,
        close: 17
      },
      {
        day: 5,
        open: 9,
        close: 17
      }
    ],
    contactInfo: {
      phone: "09890863108",
      email: "info@erecon.com"
    },
    rating: 4.2,
    verified: false
  },
  {
    name: "PERFECT E- WASTE RECYCLERS",
    description: "Authorized e-waste recycling center with capacity of 90 units",
    location: {
      type: "Point",
      coordinates: [75.3829073, 19.8763005],
      address: "Plot No. A, 8/1, MIDC Industrial Area, Chilkalthana, Aurangabad, Maharashtra 431006"
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
      phone: "09156606777",
      email: "info@perfectewaste.com"
    },
    rating: 4.3,
    verified: true
  },
  {
    name: "E Waste Recycling India",
    description: "Comprehensive e-waste recycling facility with capacity of 70 units",
    location: {
      type: "Point",
      coordinates: [72.7705215, 19.1850185],
      address: "Madina Manzil, Kedarmal Rd, near Asha Amar Building, Malad, Malad (E, Mumbai, Maharashtra 400097"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 8,
        close: 20
      },
      {
        day: 2,
        open: 8,
        close: 20
      },
      {
        day: 3,
        open: 8,
        close: 20
      },
      {
        day: 4,
        open: 8,
        close: 20
      },
      {
        day: 5,
        open: 8,
        close: 20
      },
      {
        day: 6,
        open: 8,
        close: 20
      }
    ],
    contactInfo: {
      phone: "09769077008",
      email: "info@ewasterecyclingindia.com"
    },
    rating: 4.4,
    verified: true
  },
  {
    name: "Kuldeep E-Waste Disposals",
    description: "24/7 e-waste recycling facility with capacity of 60 units",
    location: {
      type: "Point",
      coordinates: [73.8526855, 18.4497735],
      address: "Manikmoti Complex, Office No.13, Katraj, Off, Pune - Satara Rd, opp. Kanchan Hp Gas Agency, Pune, Maharashtra 411046"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 0,
        open: 0,
        close: 23
      },
      {
        day: 1,
        open: 0,
        close: 23
      },
      {
        day: 2,
        open: 0,
        close: 23
      },
      {
        day: 3,
        open: 0,
        close: 23
      },
      {
        day: 4,
        open: 0,
        close: 23
      },
      {
        day: 5,
        open: 0,
        close: 23
      },
      {
        day: 6,
        open: 0,
        close: 23
      }
    ],
    contactInfo: {
      phone: "09850289885",
      email: "info@kuldeepdisposals.com"
    },
    rating: 4.6,
    verified: true
  },
  {
    name: "Ewaste Global",
    description: "Professional e-waste recycling facility with capacity of 85 units",
    location: {
      type: "Point",
      coordinates: [73.8180333, 18.5278156],
      address: "A, J Riverview, 33/34, Sham Sundar Society Rd, near Mhatre Bridge, Navi Peth, Sadashiv Peth, Pune, Maharashtra 411030"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 9,
        close: 19
      },
      {
        day: 2,
        open: 9,
        close: 19
      },
      {
        day: 3,
        open: 9,
        close: 19
      },
      {
        day: 4,
        open: 9,
        close: 19
      },
      {
        day: 5,
        open: 9,
        close: 19
      }
    ],
    contactInfo: {
      phone: "08007980877",
      email: "info@ewasteglobal.com"
    },
    rating: 4.5,
    verified: true
  },
  {
    name: "Prabhunath Traders",
    description: "24/7 e-waste management facility with capacity of 95 units",
    location: {
      type: "Point",
      coordinates: [73.8552074, 18.4449912],
      address: "68/03, near jain mandir, Santosh Nagar, Katraj, Pune, Maharashtra 411046"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 0,
        open: 0,
        close: 23
      },
      {
        day: 1,
        open: 0,
        close: 23
      },
      {
        day: 2,
        open: 0,
        close: 23
      },
      {
        day: 3,
        open: 0,
        close: 23
      },
      {
        day: 4,
        open: 0,
        close: 23
      },
      {
        day: 5,
        open: 0,
        close: 23
      },
      {
        day: 6,
        open: 0,
        close: 23
      }
    ],
    contactInfo: {
      phone: "09326262223",
      email: "info@prabhunathtraders.com"
    },
    rating: 4.7,
    verified: true
  },
  {
    name: "Ecotech Recycling",
    description: "Professional e-waste recycling facility with capacity of 75 units",
    location: {
      type: "Point",
      coordinates: [72.8148102, 19.1850185],
      address: "301, 3rd Floor, Bldg. No. 11, Commercial Tower, near Trade Center, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051"
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
      phone: "09004547542",
      email: "info@ecotechrecycling.com"
    },
    rating: 4.4,
    verified: true
  },
  {
    name: "Mahalaxmi E Recyclers Pvt. Ltd.",
    description: "Large-scale e-waste recycling facility with capacity of 200 units",
    location: {
      type: "Point",
      coordinates: [73.9248595, 18.5015732],
      address: "Plot No 77&78, Subplot No 3A, next to Rohini Signs, Ramtekdi Industrial Area, Hadapsar, Pune, Maharashtra 411013"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    operatingHours: [
      {
        day: 1,
        open: 10,
        close: 19
      },
      {
        day: 2,
        open: 10,
        close: 19
      },
      {
        day: 3,
        open: 10,
        close: 19
      },
      {
        day: 4,
        open: 10,
        close: 19
      },
      {
        day: 5,
        open: 10,
        close: 19
      }
    ],
    contactInfo: {
      phone: "0",
      email: "info@mahalaxmierecyclers.com"
    },
    rating: 4.8,
    verified: true
  }
];

async function seedRealFacilities() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Clear existing facilities
    await Facility.deleteMany({});
    console.log('Cleared existing facilities');

    // Insert new facilities
    const facilities = await Facility.insertMany(realFacilities);
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

seedRealFacilities(); 