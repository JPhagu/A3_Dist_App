// Created by:     Joshua Phagu
// Email:          jphagu1941@conestogac.on.ca
// Student Number: 8761941
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const greetingRoutes = require('./routes/greeting'); // Import greeting.js routes
const db = require('./data/db'); // Ensure db.js uses PostgreSQL

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // For URL-encoded bodies

// Test database connection
(async () => {
  try {
    await db.query('SELECT NOW()'); // Test query to ensure connection
    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
})();

// Use the greeting routes under the /api path
app.use('/api', greetingRoutes);

// Export the app for Vercel
module.exports = app;
