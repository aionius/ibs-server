const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// load input validation
const validateRegisterInput = require("../../validator/register");
const validateLoginInput = require("../../validator/login");

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
   const { errors, isValid } = validateRegisterInput(req.body);

   // check validation
   if (!isValid) {
      return res.status(400).json(errors);
   }

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

// @route   POST /api/users/login
// @desc    User login / Return JWT Token
// @access  PUBLIC
router.post("/login", (req, res) => {
   const { errors, isValid } = validateLoginInput(req.body);

   // check validation
   if (!isValid) {
      return res.status(400).json(errors);
   }

   const email = req.body.email;
   const password = req.body.password;

   // find user
   User.findOne({ email })
      .then(user => {
         if (!user) {
            return res.status(404).json({ email: "User not found" });
         }

         // check password
         bcrypt
            .compare(password, user.password)
            .then(isMatch => {
               if (isMatch) {
                  // create jwt payload
                  const payload = {
                     id: user.id,
                     name: user.name,
                     avatar: user.avatar
                  };

                  // sign token
                  jwt.sign(
                     payload,
                     keys.secretOrKey,
                     { expiresIn: "30m" },
                     (err, token) => {
                        res.json({ success: true, token: "Bearer " + token });
                     }
                  );
               } else {
                  return res
                     .status(400)
                     .json({ password: "Password is incorrect" });
               }
            })
            .catch(err => console.log(error));
      })
      .catch(err => console.log(error));
});

// @route   GET /api/users/current
// @desc    get current user
// @access  PRIVATE
router.get(
   "/current",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
   }
);

module.exports = router;
