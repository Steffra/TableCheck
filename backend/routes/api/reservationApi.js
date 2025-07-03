const express = require("express");
const {
  getReservationDetails,
  getRemainingTime,
  getTimeLeftUntilEnoughSeatsBecomeAvailable,
} = require("../../services/reservationService");
const { getAvailableSeats } = require("../../utils/seating");

const router = express.Router();

// This endpoint is used by the polling mechanism to check the reservation status
router.get("/reservation/:id/status", async (req, res, next) => {
  try {
    const reservationId = Number(req.params.id);
    const reservation = await getReservationDetails(reservationId);
    const availableSeats = await getAvailableSeats();

    let countdown = null;
    if (reservation.status === "seated") {
      countdown = await getRemainingTime(reservationId);
    } else if (
      reservation.status === "waiting" &&
      reservation.positionInQueue === 0 &&
      availableSeats < reservation.size
    ) {
      countdown = await getTimeLeftUntilEnoughSeatsBecomeAvailable(reservation.size);
    }

    const positionInQueue = reservation.positionInQueue;

    res.json({ status: reservation.status, countdown, positionInQueue, size: reservation.size });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
