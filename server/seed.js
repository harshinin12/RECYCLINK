const mongoose = require('mongoose');
const Facility = require('./models/Facility');
require('dotenv').config();

// Sample facilities in Madurai
const facilities = [
  {
    name: "Madurai E-Waste Recycling Center",
    description: "Authorized e-waste recycling center in Madurai",
    location: {
      type: "Point",
      coordinates: [78.1198, 9.9252], // [longitude, latitude]
      address: "Anna Nagar, Madurai, Tamil Nadu 625020"
    },
    wasteTypes: ["computers", "phones", "batteries", "appliances"],
    hours: {
      monday: { open: "09:00", close: "18:00" },
      tuesday: { open: "09:00", close: "18:00" },
      wednesday: { open: "09:00", close: "18:00" },
      thursday: { open: "09:00", close: "18:00" },
      friday: { open: "09:00", close: "18:00" },
      saturday: { open: "09:00", close: "14:00" },
      sunday: { open: "09:00", close: "14:00" }
    },
    contactInfo: {
      phone: "0452-1234567",
      email: "info@maduraie-waste.com",
      website: "https://maduraie-waste.com"
    }
  },
  {
    name: "Green Tech E-Waste Solutions",
    description: "Professional e-waste management and recycling services",
    location: {
      type: "Point",
      coordinates: [78.1298, 9.9152], // [longitude, latitude]
      address: "K.K. Nagar, Madurai, Tamil Nadu 625020"
    },
    wasteTypes: ["computers", "phones", "appliances"],
    hours: {
      monday: { open: "08:00", close: "17:00" },
      tuesday: { open: "08:00", close: "17:00" },
      wednesday: { open: "08:00", close: "17:00" },
      thursday: { open: "08:00", close: "17:00" },
      friday: { open: "08:00", close: "17:00" },
      saturday: { open: "08:00", close: "13:00" },
      sunday: { open: "08:00", close: "13:00" }
    },
    contactInfo: {
      phone: "0452-2345678",
      email: "contact@greentechmadurai.com",
      website: "https://greentechmadurai.com"
    }
  },
  {
    name: "Eco Electronics Recycling",
    description: "Environmentally conscious e-waste recycling facility",
    location: {
      type: "Point",
      coordinates: [78.1098, 9.9352], // [longitude, latitude]
      address: "Villapuram, Madurai, Tamil Nadu 625012"
    },
    wasteTypes: ["computers", "batteries", "appliances"],
    hours: {
      monday: { open: "10:00", close: "19:00" },
      tuesday: { open: "10:00", close: "19:00" },
      wednesday: { open: "10:00", close: "19:00" },
      thursday: { open: "10:00", close: "19:00" },
      friday: { open: "10:00", close: "19:00" },
      saturday: { open: "10:00", close: "15:00" },
      sunday: { open: "10:00", close: "15:00" }
    },
    contactInfo: {
      phone: "0452-3456789",
      email: "info@ecoelectronicsmadurai.com",
      website: "https://ecoelectronicsmadurai.com"
    }
  },
  {
    name: "Digital Waste Management",
    description: "Specialized in mobile phone and battery recycling",
    location: {
      type: "Point",
      coordinates: [78.1398, 9.9452], // [longitude, latitude]
      address: "Goripalayam, Madurai, Tamil Nadu 625002"
    },
    wasteTypes: ["phones", "batteries", "appliances"],
    hours: {
      monday: { open: "09:30", close: "18:30" },
      tuesday: { open: "09:30", close: "18:30" },
      wednesday: { open: "09:30", close: "18:30" },
      thursday: { open: "09:30", close: "18:30" },
      friday: { open: "09:30", close: "18:30" },
      saturday: { open: "09:30", close: "14:30" },
      sunday: { open: "09:30", close: "14:30" }
    },
    contactInfo: {
      phone: "0452-4567890",
      email: "contact@digitalwastemadurai.com",
      website: "https://digitalwastemadurai.com"
    }
  }
];

// Connect to MongoDB Atlas using environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing facilities
    await Facility.deleteMany({});
    console.log('Cleared existing facilities');
    
    // Insert new facilities
    await Facility.insertMany(facilities);
    console.log('Added sample facilities');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
}); 