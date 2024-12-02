// Created by:     Joshua Phagu
// Email:          jphagu1941@conestogac.on.ca
// Student Number: 8761941
require('dotenv').config({ path: '../postgres.env' });
require('pg');
const express = require('express');
const greeting = require('../models/greeting'); // Import the Greeting model with lowercase 'g'
const sequelize = require('../data/db'); // Import your Sequelize instance
const router = express.Router();

// POST route to fetch a greeting based on timeOfDay, language, and tone
router.post('/greeting', async (req, res) => {
  const { timeOfDay, language, tone } = req.body;

  console.log('Received request with:', { timeOfDay, language, tone });

  try {
    const foundGreeting = await greeting.findOne({
      where: {
        timeOfDay,
        language,
        tone,
      },
    });

    if (!foundGreeting) {
      console.log('No greeting found for the given criteria.');
      return res.status(404).json({ error: 'Greeting not found for the given criteria.' });
    }

    console.log('Greeting found:', foundGreeting.greetingMessage);
    res.json({ greetingMessage: foundGreeting.greetingMessage, tone });
  } catch (err) {
    console.error('Error fetching greeting:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// GET route to fetch all available timeOfDay values
router.get('/timesOfDay', async (req, res) => {
  try {
    const timesOfDay = await greeting.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('timeOfDay')), 'timeOfDay']],
    });

    const distinctTimesOfDay = timesOfDay.map(row => row.timeOfDay);
    res.json(distinctTimesOfDay);
  } catch (err) {
    console.error('Error fetching timeOfDay values:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// GET route to fetch all supported languages
router.get('/languages', async (req, res) => {
  try {
    const languages = await greeting.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('language')), 'language']],
    });

    const distinctLanguages = languages.map(row => row.language);
    res.json(distinctLanguages);
  } catch (err) {
    console.error('Error fetching language values:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;