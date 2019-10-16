const express = require("express");
const router = express.Router();
const request = require("request");

// @route   /api/books
// @desc    get new books
// @access  PUBLIC
router.get("/new", (req, res) => {
   request({ uri: "https://api.itbook.store/1.0/new" }).pipe(res);
});

module.exports = router;
