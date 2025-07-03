const { getAvailableSeats } = require("../utils/seating");

async function getTemplate(reservation) {
  const { size, status, positionInQueue } = reservation;
  let template = "";

  if (status === "waiting") {
    const availableSeats = await getAvailableSeats();

    if (positionInQueue === 0 && availableSeats >= size) {
      template = "checkin/checkin.html";
    } else {
      template = "queued/queued.html";
    }
  }

  if (status === "seated") {
    template = "seated/seated.html";
  }

  if (status === "finished") {
    template = "finished/finished.html";
  }

  return `/frontend/pages/${template}`;
}

function replaceTemplateVars(html, reservation) {
  return html
    .replace(/{{reservationName}}/g, escapeHtml(reservation.name || ""))
    .replace(/{{reservationId}}/g, reservation.id || "");
}

//very basic HTML escaping to prevent XSS
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

module.exports = { getTemplate, replaceTemplateVars };
