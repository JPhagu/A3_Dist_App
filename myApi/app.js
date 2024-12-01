// Created by:     Joshua Phagu
// Email:          jphagu1941@conestogac.on.ca
// Student Number: 8761941
require('dotenv').config({ path: './postgres.env' }); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const greetingRoutes = require('./routes/greeting'); // Import your greeting routes
const { Sequelize } = require('sequelize'); // Import Sequelize
const Greeting = require('./models/greeting'); // Import the Greeting model

var sequelize = new Sequelize('greetings', 'greetings_owner', 'DJ1zGjKE0ZFl',{
  host: 'ep-solitary-smoke-a5l0frf5.us-east-2.aws.neon.tech',
  dialect: 'postgres',
  port: 5432,
  dialectOptions:{
  ssl: {
    require: true,
    rejectUnauthorized:false}
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
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Use the greeting routes under the /api path
app.use('/api', greetingRoutes);

// Export the app for Vercel
module.exports = sequelize;