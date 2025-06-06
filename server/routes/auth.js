const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    // Log the raw request body
    console.log('Raw request body:', req.body);

    // Handle both username and name fields
    const { username, name, email, password, address } = req.body;
    const userName = name || username; // Use name if available, otherwise use username

    // Detailed validation logging
    console.log('Validating fields:', {
      name: { value: userName, type: typeof userName, length: userName?.length },
      email: { value: email, type: typeof email, length: email?.length },
      password: { value: '***', type: typeof password, length: password?.length },
      address: { value: address, type: typeof address, length: address?.length }
    });

    // Validate required fields
    if (!userName || !email || !password || !address) {
      const missingFields = {
        name: !userName,
        email: !email,
        password: !password,
        address: !address
      };
      
      console.log('Missing required fields:', missingFields);
      
      return res.status(400).json({ 
        error: 'All fields are required',
        details: {
          name: !userName ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null,
          address: !address ? 'Address is required' : null
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({
        error: 'Invalid email format',
        details: { email: 'Please enter a valid email address' }
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name: userName.trim(),
      email: email.toLowerCase().trim(),
      password,
      address: address.trim()
    });

    await user.save();
    console.log('New user created:', email);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.message
      });
    }
    
    res.status(500).json({ 
      error: 'Error creating user',
      details: error.message
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { username, email, password } = req.body;

    // Use email if provided, otherwise use username as email
    const userEmail = email || username;

    if (!userEmail || !password) {
      console.log('Missing credentials:', { email: !!userEmail, password: !!password });
      return res.status(400).json({ 
        error: 'Email and password are required',
        details: {
          email: !userEmail ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Find user by email
    const user = await User.findOne({ email: userEmail.toLowerCase() });
    if (!user) {
      console.log('User not found:', userEmail);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Invalid password for user:', userEmail);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('User logged in successfully:', userEmail);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router; 