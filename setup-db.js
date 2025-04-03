const fs = require('fs');
const pool = require('./db');

const schema = fs.readFileSync('schema.sql', 'utf-8');

(async () => {
  try {
    await pool.query(schema);
    console.log('Database schema applied');
    process.exit(0);
  } catch (err) {
    console.error('Error applying schema:', err);
    process.exit(1);
  }
})();