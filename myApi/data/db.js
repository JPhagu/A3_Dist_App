require('dotenv').config({ path: './postgres.env' }); // Load environment variables

const { Pool } = require('pg');

// Create a PostgreSQL connection pool using the connection string from the .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database.');
  }
  if (client) {
    release();
  }
});

module.exports = pool;
