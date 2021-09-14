const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const { Booking } = require("../../db/models");
const { Spot } = require("../../db/models");


router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({ include: Spot });
    res.json(bookings);
  })
);

module.exports = router;
