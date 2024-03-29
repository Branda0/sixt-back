const mongoose = require("mongoose");

const Rental = mongoose.model("Rental", {
  reference: {
    unique: true,
    type: String,
  },
  client: {
    lastName: String,
    firstName: String,
    email: String,
  },
  date: {
    dateStart: String,
    dateEnd: String,
    timeStart: String,
    timeEnd: String,
    daysPaid: Number,
    timeStart: String,
    monthID: String,
  },
  car: {
    title: String,
    style: String,
    img: String,
  },
  price: Number,
  configuration: Object,
  offer: Object,
  extraFees: Number,
});

module.exports = Rental;
