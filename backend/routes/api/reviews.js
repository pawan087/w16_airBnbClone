const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const { Review } = require("../../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll();
    res.json(reviews);
  })
);

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const { userId, spotId, review } = req.body;
    const createdReview = await Review.create({
      userId,
      spotId,
      review,
    });

    return res.json({
      createdReview,
    });
  })
);

module.exports = router;
