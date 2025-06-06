const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    console.log('Profile request received for user:', req.user);
    console.log('User ID from token:', req.user.userId);

    const user = await User.findById(req.user.userId).select('-password');
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found with ID:', req.user.userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Sending profile data:', {
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address
    });
    res.json(user);
  } catch (error) {
    console.error('Profile fetch error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

// Get user's recycling history
router.get('/recycling-history', auth, async (req, res) => {
  try {
    console.log('Recycling history request received for user:', req.user);
    console.log('User ID from token:', req.user.userId);

    const user = await User.findById(req.user.userId)
      .populate('recyclingHistory')
      .select('recyclingHistory');
    
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found with ID:', req.user.userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Recycling history found:', user.recyclingHistory?.length || 0, 'items');
    res.json(user.recyclingHistory || []);
  } catch (error) {
    console.error('Recycling history fetch error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ error: 'Error fetching recycling history' });
  }
});

module.exports = router; 