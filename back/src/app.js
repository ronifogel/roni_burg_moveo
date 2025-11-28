const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Try to load .env for local development if dotenv is installed
try {
  require('dotenv').config();
} catch (e) {
  console.log('dotenv not found, proceeding without it.');
}

// Create Express app
const app = express();
// Enable CORS for all routes
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Use provided MONGODB_URI 
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// Define routes
app.use('/api', require('./routes/authRout'));
app.use('/api', require('./routes/prefRout'));
app.use('/api/dashboard', require('./routes/dashboardRoute'));




module.exports = app;
