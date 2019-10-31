const express = require("express");
const router = express.Router();

// load input validation
const validateLoginInput = require("../../validator/login");
const validateCCInput = require("../../validator/creditcard");
const validateRegisterInput = require("../../validator/register");
const validateAddressInput = require("../../validator/address");

// load User model
const User = require("../../models/User");

// load authentication middleware
const auth = require("../../middleware/authentication");

// @route   POST /api/users/register
// @desc    register user
// @access  PUBLIC
router.post("/register", async (req, res) => {
   const { errors, isValid } = validateRegisterInput(req.body);
   if (!isValid) {
      return res.status(400).send(errors);
   }

   try {
      const newUser = new User(req.body);
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
   const { errors, isValid } = validateLoginInput(req.body);
   if (!isValid) {
      return res.status(400).send(errors);
   }

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

// @route   PATCH /api/users/address
// @desc    add/update user billing/shipping address
// @access  PRIVATE
router.patch("/address", auth, async (req, res) => {
   const { errors, isValid } = validateAddressInput(req.body);
   if (!isValid) {
      return res.status(400).send(errors);
   }

   try {
      const user = req.body;
      const billing = {
         address1: user.billing_address1,
         address2: user.billing_address2,
         city: user.billing_city,
         state: user.billing_state,
         zip: user.billing_zip,
         country: user.billing_country
      };

      const shipping = {
         address1: user.shipping_address1,
         address2: user.shipping_address2,
         city: user.shipping_city,
         state: user.shippine_state,
         zip: user.shipping_zip,
         country: user.shipping_country,
         phonenumber: user.shipping_phonenumber
      };

      req.user.billing_address = billing;
      req.user.shipping_address = shipping;
      await req.user.save();

      res.status(200).send({ user: req.user });
   } catch (err) {
      res.status(400).send({ error: err.message });
   }
});

// @route   PATCH /api/users/cc
// @desc    add/update user credit card
// @access  PRIVATE
router.patch("/cc", auth, async (req, res) => {
   const { errors, isValid } = validateCCInput(req.body);
   if (!isValid) {
      return res.status(400).send(errors);
   }

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
