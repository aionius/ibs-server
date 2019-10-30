const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");

const auth = async (req, res, next) => {
   try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, keys.secretOrKey);
      const user = await User.findOne({
         _id: decoded._id,
         email: decoded.email
      });

      if (!user) {
         throw new Error();
      }

      req.token = token;
      req.user = user;
      next();
   } catch (err) {
      res.status(401).send({ error: "Please authenticate." });
   }
};

module.exports = auth;
