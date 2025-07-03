const express = require("express");
const pool = require("../../db");

const router = express.Router();

router.post("/test-utils/prepare-db-for-e2e-testing", async (req, res, next) => {
  try {
    await pool.query("UPDATE reservations SET status = 'finished'");
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
