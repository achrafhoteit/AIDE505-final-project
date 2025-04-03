const { Pool } = require('pg');
require('dotenv').config(); // loads environment variables from a .env file into process.env

const pool = new Pool({
    connectionString: process.env.DB_URL,
  }); // creates a new PostgreSQL connection pool that will be used to send queries to the database

  module.exports = pool; // export it to be used in other files