const axios = require("axios");
const express = require("express");
const router = express.Router();

// CREATE
router.post("/rental/new", async (req, res) => {
  try {
    console.log("in route");
    const response = await axios.post(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentalconfigurations/create`,
      { offerId: req.query.offerId }
    );
    console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ
router.get("/rental/new", async (req, res) => {
  try {
    console.log("in route");
    const response = await axios.post(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentalconfigurations/create`,
      { offerId: req.query.offerId }
    );
    console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
