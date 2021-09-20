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

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { id } = req.body;

    const reviewToDelete = await Review.findByPk(id);

    await reviewToDelete.destroy();

    res.end();
  })
);

module.exports = router;
