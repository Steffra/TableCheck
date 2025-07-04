const messageElement = document.getElementById("queueMessage");

async function poll() {
  try {
    const reservationId = window.location.pathname.split("/").pop();
    const result = await fetch(`/reservation/${reservationId}/status`);
    const data = await result.json();
    displayMessage(data);
  } catch (err) {
    messageElement.textContent = "Error checking status. Retrying..." + err.message;
  }
  setTimeout(poll, 1000);
}

function displayMessage(data) {
  if (data.positionInQueue === 0 && !data.countdown) {
    showBrowserNotification();
    window.location.reload();
  }
  if (data.countdown) {
    messageElement.textContent = `You'll be seated in about ${data.countdown} seconds`;
  } else {
    messageElement.textContent = `There ${data.positionInQueue === 1 ? "is" : "are"} ${data.positionInQueue} ${
      data.positionInQueue === 1 ? "party" : "parties"
    } ahead of you.`;
  }
}

function showBrowserNotification() {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("TableCheck reservation - Your table is ready!");
  }
}

poll();
