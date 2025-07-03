const { TOTAL_SEATS, SERVICE_TIME_PER_PERSON } = require("../utils/constants");
const reservationRepo = require("../repositories/reservationRepository");

async function getAvailableSeats() {
  const occupied = await reservationRepo.getOccupiedSeats();
  return TOTAL_SEATS - occupied;
}

/**
 * Calculates the time (in seconds) until enough seats become available for a waiting party
 * Without doubt the most complex part of the codebase
 */
function getTimeUntilSeatsAvailable(seated, waitingPartySize) {
  // Calculate currently occupied seats
  let occupied = 0;
  for (const s of seated) {
    occupied += Number(s.size);
  }

  // If enough seats are already available, return 0
  if (TOTAL_SEATS - occupied >= waitingPartySize) return 0;

  // Simulate parties finishing in order of their finish time
  let timeNow = Date.now();
  let parties = seated.map((s) => ({
    // Each party's finish time is their check-in time plus their service duration
    finishTime: new Date(s.check_in_at).getTime() + Number(s.size) * SERVICE_TIME_PER_PERSON * 1000,
    size: Number(s.size),
  }));

  // Sort parties by soonest finish time
  parties.sort((a, b) => a.finishTime - b.finishTime);

  // Remove parties one by one as they finish, checking after each if enough seats are free
  for (const party of parties) {
    occupied -= party.size;
    if (TOTAL_SEATS - occupied >= waitingPartySize) {
      const secondsLeft = Math.ceil((party.finishTime - timeNow) / 1000);
      return Math.max(secondsLeft, 0);
    }
  }
}

module.exports = { getAvailableSeats, getTimeUntilSeatsAvailable };
