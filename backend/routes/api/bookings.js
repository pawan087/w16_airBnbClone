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

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const { userId, spotId, startDate, endDate } = req.body;
    const booking = await Booking.create({
      userId,
      spotId,
      startDate,
      endDate,
    });

    return res.json({
      booking,
    });
  })
);

module.exports = router;
