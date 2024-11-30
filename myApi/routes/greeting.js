const express = require('express');
const db = require('../data/db'); // Database connection
const router = express.Router();

// POST route to fetch a greeting based on timeOfDay, language, and tone
router.post('/greeting', async (req, res) => {
    const { timeOfDay, language, tone } = req.body;

    console.log('Received request with:', { timeOfDay, language, tone });

    try {
        // Query the PostgreSQL database
        const result = await db.query(
            'SELECT greetingMessage FROM Greetings WHERE timeOfDay = $1 AND language = $2 AND tone = $3',
            [timeOfDay, language, tone]
        );

        // Log the row fetched from the database
        console.log('Row fetched:', result.rows);

        if (result.rows.length === 0) {
            console.log('No greeting found for the given criteria.');
            return res.status(404).json({ error: 'Greeting not found for the given criteria.' });
        }

        console.log('Greeting found:', result.rows[0].greetingmessage);
        res.json({ greetingMessage: result.rows[0].greetingmessage, tone });
    } catch (err) {
        console.error('Error fetching greeting:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

// GET route to fetch all available timeOfDay values
router.get('/timesOfDay', async (req, res) => {
    try {
        const result = await db.query('SELECT DISTINCT timeOfDay FROM Greetings');
        const timesOfDay = result.rows.map(row => row.timeofday); // PostgreSQL uses lowercase by default
        res.json(timesOfDay);
    } catch (err) {
        console.error('Error fetching timeOfDay values:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

// GET route to fetch all supported languages
router.get('/languages', async (req, res) => {
    try {
        const result = await db.query('SELECT DISTINCT language FROM Greetings');
        const languages = result.rows.map(row => row.language); // PostgreSQL uses lowercase by default
        res.json(languages);
    } catch (err) {
        console.error('Error fetching language values:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
