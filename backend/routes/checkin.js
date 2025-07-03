const express = require("express");
const { handleCheckIn, scheduleAutoFinish } = require("../services/checkinService");
const { getReservationDetails } = require("../services/reservationService");
const router = express.Router();

router.post("/check-in/:id", async (req, res, next) => {
  const reservationId = Number(req.params.id);

  try {
    const reservation = await getReservationDetails(reservationId);
    await handleCheckIn(reservationId);
    scheduleAutoFinish(reservationId, reservation.size);
    res.redirect(`/reservation/${reservationId}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
