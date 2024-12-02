// Created by:     Joshua Phagu
// Email:          jphagu1941@conestogac.on.ca
// Student Number: 8761941
require('dotenv').config({ path: './postgres.env' }); // Load environment variables
require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const greetingRoutes = require('./greeting'); // Import your greeting routes
const { Sequelize } = require('sequelize'); // Import Sequelize
const Greeting = require('./models/greeting'); // Import the Greeting model
//const PORT = 5000;

const isProduction = process.env.NODE_ENV === 'production'
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Test database connection and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    // Sync the Greeting model
    await Greeting.sync(); // This creates the table if it doesn't exist
    console.log('Greetings table created or already exists.');
  } catch (err) {
    console.error('Database connection error:', err);
  }
})();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
//app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Use the greeting routes under the /api path
app.use('/api', greetingRoutes);
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
// Export the app for Vercel
module.exports = app;