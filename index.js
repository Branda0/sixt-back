require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(formidable());

// mongoose.connect(process.env.MONGODB_URI);

mongoose.connect("mongodb://localhost/sixt");

const agenciesRoutes = require("./routes/agencies");
app.use(agenciesRoutes);

const offersRoutes = require("./routes/offers");
app.use(offersRoutes);

const rentalsRoutes = require("./routes/rentals");
app.use(rentalsRoutes);

app.all("*", (req, res) => {
  res.status(404).json("Page not Found");
});

app.listen(process.env.PORT, () => {
  console.log("Server Started 🚀");
});
