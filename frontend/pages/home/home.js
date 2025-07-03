document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlistForm");
  const nameInput = document.getElementById("name");
  const sizeInput = document.getElementById("size");
  const nameError = document.getElementById("nameError");
  const sizeError = document.getElementById("sizeError");

  function validateName() {
    if (!nameInput.value.trim()) {
      nameError.textContent = "Please enter your name";
      return false;
    }
    nameError.textContent = "";
    return true;
  }

  function validateSize() {
    if (sizeInput.value === "") {
      sizeError.textContent = "Please enter your party size";
      return false;
    }

    const value = Number(sizeInput.value);
    if (!Number.isInteger(value)) {
      sizeError.textContent = "Party size must be a whole number";
      return false;
    }
    if (value < 1) {
      sizeError.textContent = "Party size must be at least 1.";
      return false;
    }
    if (value > 10) {
      sizeError.textContent = "We can only seat up to 10 people per reservation.";
      return false;
    }
    sizeError.textContent = "";
    return true;
  }

  nameInput.addEventListener("input", validateName);
  sizeInput.addEventListener("input", validateSize);

  form.addEventListener("submit", (e) => {
    const validName = validateName();
    const validSize = validateSize();
    if (!validName || !validSize) {
      e.preventDefault();
    }
  });
});
