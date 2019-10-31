const express = require("express");
const router = express.Router();

// @route   POST /api/cart/add
// @desc    add item to cart
// @access  PUBLIC
router.post("/add", (req, res) => {
   res.sendStatus(200);
});

// @route   GET /api/cart/getall
// @desc    get cart contents
// @access  PUBLIC
router.get("/getall", (req, res) => {
   res.sendStatus(200);
});

module.exports = router;
