const notifyArea = document.getElementById("notifyArea");

function initNotification() {
  notifyArea.innerHTML = "";
  if (Notification.permission === "default") {
    displayPermissionRequestButton();
  } else {
    displayNotificationMessage(Notification.permission);
  }
}

function displayPermissionRequestButton() {
  const button = document.createElement("button");
  button.textContent = "Get notified when it's your turn to check in";
  button.addEventListener("click", () => {
    Notification.requestPermission().then(() => {
      initNotification();
    });
  });
  notifyArea.appendChild(button);
}

function displayNotificationMessage(permission) {
  const msg = document.createElement("span");
  if (permission === "granted") {
    msg.textContent = "You'll get a notification when it's your turn!";
  } else {
    msg.textContent =
      "Notifications are blocked. Enable them in your browser to get notified when it's your turn.";
  }
  notifyArea.appendChild(msg);
}

initNotification();
