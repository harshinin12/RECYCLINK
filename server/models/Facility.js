const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  wasteTypes: [{
    type: String,
    required: true
  }],
  operatingHours: [{
    day: {
      type: Number,
      required: true,
      min: 1,
      max: 7
    },
    open: {
      type: Number,
      required: true,
      min: 0,
      max: 23
    },
    close: {
      type: Number,
      required: true,
      min: 0,
      max: 23
    }
  }],
  contactInfo: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    }
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Create a 2dsphere index for location-based queries
facilitySchema.index({ location: '2dsphere' });

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility; 