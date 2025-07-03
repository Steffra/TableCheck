const pool = require("../db");

async function findById(id) {
  const { rows } = await pool.query(
    "SELECT joined_at, name, size, status, check_in_at FROM reservations WHERE id = $1",
    [id]
  );
  return rows[0] || null;
}

// Returns number of parties in queue ahead
async function getWaitingInFrontCount(joinedAt) {
  const { rows } = await pool.query("SELECT COUNT(*) FROM reservations WHERE status = 'waiting' AND joined_at < $1", [
    joinedAt,
  ]);
  return Number(rows[0].count);
}

async function updateStatus(id, status) {
  await pool.query("UPDATE reservations SET status = $1 WHERE id = $2", [status, id]);
}

async function updateStatusAndCheckInAt(id, status) {
  await pool.query("UPDATE reservations SET status = $1, check_in_at = NOW() WHERE id = $2", [status, id]);
}

async function createReservation(name, size) {
  const { rows } = await pool.query("INSERT INTO reservations (name, size, status) VALUES ($1, $2, $3) RETURNING id", [
    name,
    Number(size),
    "waiting",
  ]);
  return rows[0].id;
}

async function getCheckInInfo(id) {
  const row = await findById(id);
  if (!row) return null;
  return { check_in_at: row.check_in_at, size: row.size };
}

async function getAllSeatedReservations() {
  const { rows } = await pool.query(
    `SELECT check_in_at, size FROM reservations WHERE status = 'seated' ORDER BY check_in_at ASC`
  );
  return rows;
}

async function getOccupiedSeats() {
  const result = await pool.query("SELECT COALESCE(SUM(size), 0) AS occupied FROM reservations WHERE status = $1", [
    "seated",
  ]);
  return Number(result.rows[0].occupied);
}

module.exports = {
  findById,
  getWaitingInFrontCount,
  updateStatus,
  updateStatusAndCheckInAt,
  createReservation,
  getCheckInInfo,
  getAllSeatedReservations,
  getOccupiedSeats,
};
