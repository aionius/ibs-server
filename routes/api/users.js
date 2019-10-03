const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// load User model
const User = require("../../models/User");

// @route   GET /api/users/test
// @desc    Test users route
// @access  PUBLIC
router.get("/test", (req, res) => res.json({ msg: "Users test works..." }));

// @route   POST /api/users/register
// @desc    register user
// @access  PUBLIC
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        // find user's avatar
        const avatar = gravatar.url(req.body.email, {
          s: 200,
          rating: "pg",
          default: "mm"
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
