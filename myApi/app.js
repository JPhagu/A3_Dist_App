// Created by:     Joshua Phagu
// Email:          jphagu1941@conestogac.on.ca
// Student Number: 8761941
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db'); // Your database connection module
const greetingRoutes = require('./routes/greeting'); // Import greeting.js routes

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Test database connection
(async () => {
  try {
    await db.query('SELECT NOW()'); // Simple test query
    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
})();

// Use the greeting routes under the /api path
app.use('/api', greetingRoutes);

// Export app for use in a serverless environment like Vercel
module.exports = app;

// Optional for local testing; comment this out for serverless deployment
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
