const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/offers", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentaloffers?pickupStation=${req.query.agencyId}&returnStation=${req.query.agencyId}&pickupDate=${req.query.startDate}&returnDate=${req.query.endDate}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/offer/configurations", async (req, res) => {
  try {
    const response = await axios.post(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentalconfigurations/create`,
      { offerId: req.query.offerId }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
