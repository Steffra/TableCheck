const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.sendFile(path.resolve(__dirname, "../../frontend/pages/home/home.html"));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
