const axios = require("axios");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const Rental = require("../models/Rentals");

// CREATE
router.post("/rental/new", async (req, res) => {
  try {
    // If LastName length is < 3 add X char at the end for rental reference id creation
    const refName =
      req.fields.lastName.length > 2
        ? req.fields.lastName.slice(0, 3)
        : req.fields.lastName + "XX".slice(0, 3 - req.fields.lastName.length);

    const month = moment(req.fields.dateStart, "YYYY-MM-DD").format("MM");
    const year = moment(req.fields.dateStart, "YYYY-MM-DD").format("YY");
    const actualMonth = moment(new Date()).format("MM");

    //find last rental created on DB
    const lastItem = await Rental.findOne().sort({ field: "asc", _id: -1 }).limit(1);

    // initial refIndex added as 000 for first item then 001,002 etc
    let refIndex = 0;

    // check if the last item created on DB is from same month as the new one, if so increment reference index, if not start again with 000 ref index
    if (lastItem && lastItem.date.monthID === actualMonth) {
      refIndex = Number(lastItem.reference.slice(-3)) + 1;
    }
    const reference = refName.toUpperCase() + year + month + String(refIndex).padStart(3, "0");

    // creating new Rental on DB
    const newRental = new Rental({
      reference: reference,
      client: {
        lastName: req.fields.lastName,
        firstName: req.fields.firstName,
        email: req.fields.email,
      },
      date: {
        dateStart: req.fields.dateStart,
        dateEnd: req.fields.dateEnd,
        daysPaid: req.fields.rentalDays,
        monthID: actualMonth,
      },
      car: {
        title: req.fields.offer.headlines.description,
        style: req.fields.offer.carGroupInfo.bodyStyle,
        image: req.fields.offer.images.small,
      },
      price: req.fields.totalPrice.toFixed(2),
      configuration: req.fields.configurationData,
    });
    // const month = moment(req.fields.dateStart, "YYYY-MM-DD").format("MM");
    await newRental.save();

    res.status(200).json({ reference: reference });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ
// router.get("/rental/new", async (req, res) => {
//   try {
//     console.log("in route");
//     const response = await axios.post(
//       `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentalconfigurations/create`,
//       { offerId: req.query.offerId }
//     );
//     console.log(response.data);

//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

module.exports = router;
