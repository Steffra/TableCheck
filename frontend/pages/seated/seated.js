async function poll() {
  const reservationId = window.location.pathname.split("/").pop();
  const result = await fetch(`/reservation/${reservationId}/status`);
  const data = await result.json();

  if (data.status === "finished") {
    window.location.reload();
    return;
  }

  const fraction = data.countdown / (data.size * 3);
  setProgressCircle(fraction);

  document.getElementById("countdownText").textContent = `Time left:\n${data.countdown} seconds`;

  setTimeout(poll, 1000);
}

function setProgressCircle(fraction) {
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const circle = document.querySelector(".foreground");
  const gap = 12;
  const filled = Math.max(0, circumference * fraction - gap);

  circle.style.strokeDasharray = `${filled} ${circumference}`;
  circle.style.strokeDashoffset = `${-gap / 2}`;
}

poll();
