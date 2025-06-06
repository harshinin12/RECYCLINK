const mongoose = require('mongoose');

const recyclingBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  facilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true
  },
  deviceType: {
    type: String,
    required: true,
    enum: ['mobile', 'laptop', 'tablet', 'ipad', 'gadgets']
  },
  brand: {
    type: String,
    required: true
  },
  modelName: {
    type: String,
    required: true
  },
  pickupAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  recyclingPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RecyclingBooking', recyclingBookingSchema); 