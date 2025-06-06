const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import Google Generative AI SDK

const Facility = require('./models/Facility');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const facilityRoutes = require('./routes/facilities');
const recyclingRoutes = require('./routes/recycling');
const { scheduleStatusUpdates } = require('./utils/scheduler');

// Load environment variables from .env file
const envPath = path.join(__dirname, '.env');
console.log('Loading environment variables from:', envPath);
dotenv.config({ path: envPath });

// Log environment variables (without sensitive data)
console.log('Environment variables loaded:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ? 'URI is set' : 'URI is missing',
  JWT_SECRET: process.env.JWT_SECRET ? 'Secret is set' : 'Secret is missing',
  EMAIL_USER: process.env.EMAIL_USER ? 'Email user is set' : 'Email user is missing',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Email password is set' : 'Email password is missing'
});

const app = express();

// Configure CORS - more permissive for development
// Replace 'http://localhost:3000' with the actual URL of your frontend in production
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Access your API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error('GEMINI_API_KEY environment variable not set.');
    // Consider a more robust error handling in production, maybe don't exit immediately
    // process.exit(1); // Exit if key is missing
}

// Initialize the Google Generative AI SDK
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Get the generative model
// We'll use 'gemini-2.0-flash' which is good for chat
// Add a system instruction to guide the model on e-waste topics
const model = genAI ? genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are an AI assistant specializing in e-waste recycling and management. Provide helpful, accurate, and concise information about recycling facilities, proper disposal methods, environmental impact, related regulations, and answer questions about electronic waste. If a query is outside the scope of e-waste, politely steer the conversation back or indicate you can only help with e-waste topics."
}) : null;

// Simple in-memory storage for conversation history (for demonstration)
// In a production app, store this persistently (e.g., in a database) per user session
const conversations = {};

// API Routes - These must come BEFORE the static file serving
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/recycling', recyclingRoutes);

// Chatbot endpoint
app.post('/api/chat', async (req, res) => {
    if (!model) {
        return res.status(500).json({ error: 'Chatbot model not initialized. GEMINI_API_KEY may be missing.' });
    }

    const userId = req.body.userId || req.ip; // Use IP as a simple user ID for demonstration
    const userMessage = req.body.message;
    let history = conversations[userId] || [];

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    try {
        // Start or continue a chat with history
        const chat = model.startChat({
            history: history,
            //generationConfig: {
             //   maxOutputTokens: 500, // Limit response length
            //},
            // Remove systemInstruction from here
        });

        console.log(`User (${userId}): ${userMessage}`);

        const result = await chat.sendMessage(userMessage);
        const response = result.response;
        const botResponse = response.text();

        console.log(`Bot: ${botResponse}`);

        // Update conversation history (store both user and bot messages)
        // Only store if response was successful
        history = [ // Recreate history array
            ...history,
            { role: "user", parts: [{ text: userMessage }] },
            { role: "model", parts: [{ text: botResponse }] },
        ];
        conversations[userId] = history; // Save updated history

        res.json({ response: botResponse });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        // Send a user-friendly error message
        res.status(500).json({ error: 'Sorry, I am having trouble processing your request right now. Please try again later.' });
    }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    name: err.name
  });
  res.status(500).json({ 
    error: 'Something broke!',
    details: err.message 
  });
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Start the server first
    // Use the PORT from environment variables, default to 5000
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Then start the scheduler
    try {
      const scheduler = scheduleStatusUpdates();
      if (!scheduler) {
        console.warn('Failed to start the scheduler. Status updates will not be automatic.');
      } else {
        console.log('Scheduler started successfully');
      }
    } catch (schedulerError) {
      console.error('Error starting scheduler:', schedulerError);
      console.warn('Continuing without scheduler. Status updates will not be automatic.');
    }

    // Handle server shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        mongoose.connection.close(false, () => {
          console.log('MongoDB connection closed');
          process.exit(0);
        });
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Serve static files from the React app - This must come AFTER API routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} 

// Placeholder for the chat endpoint (we'll add this next)
// app.post('/api/chat', ...);

/* Removed duplicate app.listen call */ 