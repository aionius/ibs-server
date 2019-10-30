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

// load authentication middleware
const auth = require("../../middleware/authentication");

// @route   POST /api/users/register
// @desc    register user
// @access  PUBLIC
router.post("/register", async (req, res) => {
   const user = req.body;

   // TODO: validate request body
   const newUser = new User({
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
      email: user.email,
      billing_address: {
         address1: user.billing_address1,
         address2: user.billing_address2,
         city: user.billing_city,
         state: user.billing_state,
         zip: user.billing_zip,
         country: user.billing_country
      },
      shipping_address: {
         address1: user.shipping_address1,
         address2: user.shipping_address2,
         city: user.shipping_city,
         state: user.shippine_state,
         zip: user.shipping_zip,
         country: user.shipping_country,
         phonenumber: user.shipping_phonenumber
      }
   });

   try {
      const user = await User.findOne({ email: newUser.email });
      if (user) {
         return res.status(400).send({ error: "Email already registered." });
      }

      await newUser
         .save()
         .then(user => {
            const token = user.generateAuthToken();
            res.status(200).send({ user, token });
         })
         .catch(error => console.log(error));
   } catch (err) {
      res.status(400).send({ error: err.message });
   }
});

// @route   POST /api/users/login
// @desc    User login / Return JWT Token
// @access  PUBLIC
router.post("/login", async (req, res) => {
   // TODO: validate request body
   try {
      const user = await User.findByCredentials(
         req.body.email,
         req.body.password
      );

      const token = await user.generateAuthToken();

      res.status(200).send({ user, token });
   } catch (err) {
      res.status(400).send({ error: err.message });
   }
});

// @route   POST /api/users/cc
// @desc    add/update user credit card
// @access  PRIVATE
router.patch("/cc", auth, async (req, res) => {
   // TODO: validate request body
   try {
      const cc = {
         credit_card_name: req.body.credit_card_name,
         credit_card_number: req.body.credit_card_number,
         expiration_date: req.body.expiration_date
      };

      req.user.credit_card_info = cc;
      await req.user.save();

      res.status(200).send(req.user);
   } catch (err) {
      res.status(400).send({ error: err.message });
   }
});

module.exports = router;
