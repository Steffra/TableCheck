const { getAvailableSeats } = require("../utils/seating");
const { getReservationDetails } = require("./reservationService");
const reservationRepo = require("../repositories/reservationRepository");
const { SERVICE_TIME_PER_PERSON } = require("../utils/constants");

async function handleCheckIn(reservationId) {
  const reservation = await getReservationDetails(reservationId);
  if (!reservation) return { success: false, message: "Reservation not found" };

  const availableSeats = await getAvailableSeats();
  if (availableSeats < reservation.size) {
    return { success: false, message: "Not enough seats available" };
  }

  await reservationRepo.updateStatusAndCheckInAt(reservationId, "seated");
  return { success: true, size: reservation.size };
}

function scheduleAutoFinish(reservationId, size) {
  setTimeout(async () => {
    try {
      await reservationRepo.updateStatus(reservationId, "finished");
    } catch (err) {
      console.error(`Error auto-finishing reservation ${reservationId}:`, err);
    }
  }, size * SERVICE_TIME_PER_PERSON * 1000);
}

module.exports = {
  handleCheckIn,
  scheduleAutoFinish,
};
