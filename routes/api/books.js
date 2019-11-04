const express = require("express");
const router = express.Router();
const request = require("request");

const config = require("../../config/keys");

// @route   /api/books
// @desc    get new books
// @access  PUBLIC
router.get("/new", (req, res) => {
   request({ uri: `${config.ibsURL}/news` }).pipe(res);
});

// @route   /api/books/:id
// @desc    get book details by ISBN
// @access  PUBLIC
router.get("/:id", (req, res) => {
   request({ uri: `${config.ibsURL}/books/${req.params.id}` }).pipe(res);
});

// @route   /api/books/search/:searchQuery
// @desc    search book by keyword
// @access  PUBLIC
router.get("/search/:searchQuery", (req, res) => {
   request({ uri: `${config.ibsURL}/search/${req.params.searchQuery}` }).pipe(
      res
   );
});

// @route   /api/books/search/:searchQuery/:page
// @desc    get search result by page
// @access  PUBLIC
router.get("/search/:searchQuery/:page", (req, res) => {
   request({
      uri: `${config.ibsURL}/search/${req.params.searchQuery}/${req.params.page}`
   }).pipe(res);
});

module.exports = router;
