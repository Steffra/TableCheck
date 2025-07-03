const { getTimeUntilSeatsAvailable } = require("../utils/seating");
const reservationRepo = require("../repositories/reservationRepository");
const { TOTAL_SEATS } = require("../utils/constants");

async function getReservationDetails(id) {
  const row = await reservationRepo.findById(id);
  if (!row) return null;

  const { joined_at, size, status, name } = row;
  let positionInQueue = null;
  if (status === "waiting") {
    positionInQueue = await reservationRepo.getWaitingInFrontCount(joined_at);
  }

  return { id, size, status, positionInQueue, name };
}

async function createReservation(name, size) {
  if (!name || !size || isNaN(size) || size < 1 || size > TOTAL_SEATS) {
    return { success: false, message: "Invalid input" };
  }
  try {
    const id = await reservationRepo.createReservation(name, size);
    return { success: true, id };
  } catch (err) {
    return { success: false, message: "Server error", error: err };
  }
}

async function getRemainingTime(reservationId) {
  const { check_in_at, size } = await reservationRepo.findById(reservationId);
  const duration = Number(size) * 3;
  const checkInTime = new Date(check_in_at).getTime();
  const now = Date.now();
  const elapsed = Math.floor((now - checkInTime) / 1000);
  return Math.max(duration - elapsed, 0);
}

async function getTimeLeftUntilEnoughSeatsBecomeAvailable(waitingPartySize) {
  const seated = await reservationRepo.getAllSeatedReservations();
  return getTimeUntilSeatsAvailable(seated, waitingPartySize);
}

module.exports = {
  getReservationDetails,
  createReservation,
  getRemainingTime,
  getTimeLeftUntilEnoughSeatsBecomeAvailable,
};
