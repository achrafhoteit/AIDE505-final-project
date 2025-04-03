const pool = require('./db');

// Check the DB URL being used
console.log('🔍 Using DB URL:', process.env.DB_URL);

async function testConnection() {
    try {
      const res = await pool.query('SELECT NOW()');
      console.log('Connected to DB at:', res.rows[0].now);
      process.exit(0);
    } catch (err) {
      console.error('DB connection failed:', err);
      process.exit(1);
    }
  }
  
  testConnection();