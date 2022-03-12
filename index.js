require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(formidable());

// mongoose.connect(process.env.MONGODB_URI);

//mongoose.connect("mongodb://localhost/sixt");

app.get("/", async (req, res) => {
  try {
    res.status(200).json("IN ROUTE");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json("Page not Found");
});

app.listen(process.env.PORT, () => {
  console.log("Server Started 🚀");
});
