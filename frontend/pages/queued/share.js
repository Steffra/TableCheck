const button = document.getElementById("shareButton");
button.addEventListener("click", async () => {
  if (navigator.share) {
    await navigator.share({
      title: "TableCheck Reservation",
      url: window.location.href,
    });
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(url);
  }
});
