const express = require("express");
const path = require("path");
const fs = require("fs").promises;

const { createReservation, getReservationDetails } = require("../services/reservationService");
const { getTemplate, replaceTemplateVars } = require("../services/templateService");

const router = express.Router();

// Serves the HTML page of the reservation
router.get("/reservation/:id", async (req, res, next) => {
  const reservationId = Number(req.params.id);
  try {
    const reservation = await getReservationDetails(reservationId);
    if (!reservation) return res.redirect("/");

    const templatePath = await getTemplate(reservation);
    const template = await fs.readFile(path.resolve(__dirname, `../../${templatePath}`), "utf-8");
    const html = replaceTemplateVars(template, reservation);
    res.send(html);
  } catch (err) {
    next(err);
  }
});

// Create new reservation (handles form submission)
router.post("/reservation", async (req, res, next) => {
  const { name, size } = req.body;
  try {
    const result = await createReservation(name, size);
    if (!result.success) return res.redirect("/");

    res.redirect(`/reservation/${result.id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
