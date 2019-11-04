const express = require("express");
const router = express.Router();

const Order = require("../../models/Order");

// @route   POST /api/cart/add
// @desc    add item to cart
// @access  PUBLIC
router.post("/add", async (req, res) => {
   try {
      const order = new Order(req.body);
      await order.save();
      res.status(201).send(req.body);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

module.exports = router;
