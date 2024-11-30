const db = require('./data/db'); // Import the PostgreSQL connection

(async () => {
  try {
    // Create the Greetings table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Greetings (
        id SERIAL PRIMARY KEY,          -- Auto-incrementing primary key
        timeOfDay VARCHAR(50) NOT NULL, -- Time of day (e.g., morning, evening)
        language VARCHAR(50) NOT NULL,  -- Language (e.g., English, French)
        greetingMessage TEXT NOT NULL,  -- The greeting message
        tone VARCHAR(50) NOT NULL       -- Tone (e.g., formal, casual)
      );
    `;

    await db.query(createTableQuery); // Run the SQL query
    console.log('Greetings table created or already exists.');
  } catch (err) {
    console.error('Error creating Greetings table:', err.message);
  } finally {
    process.exit(); // Exit the script
  }
})();
