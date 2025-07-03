const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static(path.resolve(__dirname, "../frontend")));

app.use("/", require("./routes/home"));
app.use("/", require("./routes/reservation"));
app.use("/", require("./routes/api/reservationApi"));
app.use("/", require("./routes/checkin"));

app.use((req, res) => {
  res.redirect("/");
});

app.use(errorHandler);

app.listen(3000, () => console.log("Server running on port 3000"));
