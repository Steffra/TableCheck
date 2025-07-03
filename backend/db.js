// Database connection pool setup for PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Helper for transactions if needed in future
async function getClient() {
  const client = await pool.connect();
  return client;
}

module.exports = pool;
module.exports.getClient = getClient;