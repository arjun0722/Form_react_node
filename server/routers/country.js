const express = require("express");
const router = express.Router();
const Countrydata = require("../models/countrySchema");

router.post("/", async (req, res) => {
  try {
    const countriesData = req.body;

    for (const countryData of countriesData) {
      const country = new Countrydata(countryData);
      await country.save();
    }

    res.status(201).json({ message: "Countries data saved to the database." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
    try {
      const countries = await Countrydata.find();
      res.status(200).json(countries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
