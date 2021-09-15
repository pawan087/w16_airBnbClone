const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const { Image } = require("../../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const images = await Image.findAll();
    res.json(images);
  })
);

module.exports = router;
