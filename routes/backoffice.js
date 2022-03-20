const axios = require("axios");
const express = require("express");
const router = express.Router();

router.post("/backoffice/login", async (req, res) => {
  try {
    console.log(req.fields);
    if (req.fields.adminPassword !== process.env.PASSWORD) {
      return res.status(401).json({ error: "authentification refused" });
    }
    console.log("in route");
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
