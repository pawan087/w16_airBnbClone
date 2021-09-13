const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const { Spot } = require("../../db/models");


router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log(Spot);
    const spots = await Spot.findAll();
    res.json(spots);
  })
);

module.exports = router;
