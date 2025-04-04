const { Pool } = require('pg');
// require('dotenv').config(); // loads environment variables from a .env file into process.env
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  }
});

module.exports = pool; // export it to be used in other files