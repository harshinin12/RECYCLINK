const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const RecyclingBooking = require('../models/RecyclingBooking');
const User = require('../models/User');
const { sendBookingConfirmation, testEmailConfig, sendTestEmail, sendEmail } = require('../utils/emailService');

// Test email configuration - no auth required
router.post('/test-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email address is required' });
    }

    console.log('Testing email configuration...');
    console.log('Email configuration:', {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD ? 'Password is set' : 'Password is missing'
    });

    // First test the email configuration
    const configValid = await testEmailConfig();
    if (!configValid) {
      return res.status(500).json({ 
        error: 'Email configuration is invalid',
        details: 'Please check your .env file and ensure EMAIL_USER and EMAIL_PASSWORD are set correctly'
      });
    }

    // Then try to send the test email
    const emailSent = await sendTestEmail(email);
    if (!emailSent) {
      return res.status(500).json({ 
        error: 'Failed to send test email',
        details: 'Email sending failed. Please check the server logs for more details.'
      });
    }

    res.json({ 
      message: 'Test email sent successfully'
    });
  } catch (error) {
    console.error('Error in test-email endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to send test email',
      details: error.message
    });
  }
});

// Book recycling
router.post('/book', auth, async (req, res) => {
  try {
    console.log('Booking request received:', {
      user: req.user,
      body: req.body
    });

    // Test email configuration first
    const emailConfigValid = await testEmailConfig();
    if (!emailConfigValid) {
      console.warn('Email configuration is invalid. Proceeding with booking but emails will not be sent.');
    }

    const {
      facilityId,
      deviceType,
      brand,
      modelName,
      pickupAddress,
      phoneNumber,
      recyclingPrice
    } = req.body;

    // Validate required fields
    if (!facilityId || !deviceType || !brand || !modelName || !pickupAddress || !phoneNumber || !recyclingPrice) {
      console.log('Missing required fields:', {
        facilityId: !!facilityId,
        deviceType: !!deviceType,
        brand: !!brand,
        modelName: !!modelName,
        pickupAddress: !!pickupAddress,
        phoneNumber: !!phoneNumber,
        recyclingPrice: !!recyclingPrice
      });
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Get user email
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Found user:', {
      id: user._id,
      email: user.email
    });

    const booking = new RecyclingBooking({
      userId: req.user.userId,
      facilityId,
      deviceType,
      brand,
      modelName,
      pickupAddress,
      phoneNumber,
      recyclingPrice
    });

    await booking.save();
    console.log('Booking saved successfully:', booking._id);
    
    // Send confirmation email
    if (emailConfigValid) {
      try {
        console.log('Attempting to send booking confirmation email...');
        const emailSent = await sendBookingConfirmation(user.email, {
          ...booking.toObject(),
          status: 'pending'
        });
        
        if (emailSent) {
          console.log('Booking confirmation email sent successfully');
        } else {
          console.warn('Failed to send booking confirmation email');
        }
      } catch (emailError) {
        console.error('Error in email sending process:', {
          message: emailError.message,
          code: emailError.code,
          stack: emailError.stack
        });
      }
    }

    res.status(201).json({
      booking,
      emailSent: emailConfigValid
    });
  } catch (error) {
    console.error('Error booking recycling:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      validationErrors: error.errors
    });
    res.status(500).json({ 
      error: 'Failed to book recycling',
      details: error.message
    });
  }
});

// Get user's recycling history
router.get('/history', auth, async (req, res) => {
  try {
    const bookings = await RecyclingBooking.find({ userId: req.user.userId })
      .populate('facilityId', 'name location')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching recycling history:', error);
    res.status(500).json({ error: 'Failed to fetch recycling history' });
  }
});

module.exports = router; 