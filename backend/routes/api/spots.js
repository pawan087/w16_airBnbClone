const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Spot } = require("../../db/models");
const { Image } = require("../../db/models");


router.get(
  "/",
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({ include: Image });
    res.json(spots);
  })
);

module.exports = router;
