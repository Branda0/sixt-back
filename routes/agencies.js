const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/agencies", async (req, res) => {
  try {
    if (req.query.term.length < 3) return res.status(401).json({ error: "term length too short" });

    const response = await axios.get(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/locations?term=${req.query.term}`,
      {
        headers: { authorization: `Bearer ${process.env.SIXT_API_KEY}` },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
