const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const config = require("../config/keys");

const UserSchema = new Schema(
   {
      firstname: {
         type: String,
         required: true,
         trim: true
      },
      lastname: {
         type: String,
         required: true,
         trim: true
      },
      billing_address: {
         address1: {
            type: String,
            trim: true
         },
         address2: {
            type: String,
            trim: true
         },
         city: {
            type: String,
            trim: true
         },
         state: {
            type: String,
            trim: true
         },
         zip: {
            type: String,
            trim: true
         },
         country: {
            type: String,
            trim: true
         }
      },
      shipping_address: {
         address1: {
            type: String,
            trim: true
         },
         address2: {
            type: String,
            trim: true
         },
         city: {
            type: String,
            trim: true
         },
         state: {
            type: String,
            trim: true
         },
         zip: {
            type: String,
            trim: true
         },
         country: {
            type: String,
            trim: true
         },
         phonenumber: {
            type: String,
            trim: true
         }
      },
      email: {
         type: String,
         required: true,
         trim: true,
         lowercase: true,
         validate(value) {
            if (!validator.isEmail(value)) {
               throw new Error("Email is invalid.");
            }
         }
      },
      password: {
         type: String,
         required: true,
         trim: true,
         minlength: 8,
         validate(value) {
            if (value.toLowerCase().includes("password")) {
               throw new Error("You can't use '" + value + "' for password.");
            }
         }
      },
      mobile_number: {
         type: String,
         trime: true,
         validate(value) {
            if (!validator.isMobilePhone(value)) {
               throw new Error("Mobile phone number is invalid.");
            }
         }
      },
      credit_card_info: [
         {
            credit_card_name: {
               type: String,
               trim: true
            },
            credit_card_number: {
               type: String,
               trim: true,
               validate(value) {
                  if (!validator.isCreditCard(value)) {
                     throw new Error("Credit card is invalid.");
                  }
               }
            },
            expiration_date: {
               type: String,
               trim: true
            }
         }
      ]
   },
   {
      timestamps: true
   }
);

UserSchema.virtual("orders", {
   ref: "Order",
   localField: "_id",
   foreignField: "user"
});

// statics are accessible through the model
UserSchema.statics.findByCredentials = async ({ email, password }) => {
   const user = await User.findOne({ email });
   if (!user) {
      throw new Error("Unable to login.");
   }

   const isPasswordMatched = await bcrypt.compare(password, user.password);
   if (!isPasswordMatched) {
      throw new Error("Unable to login.");
   }

   return user;
};

// methods are accessible on the instance of the model
UserSchema.methods.generateAuthToken = function() {
   const user = this;
   const payload = {
      _id: user._id.toString(),
      email: user.email
   };
   const token = jwt.sign(payload, config.secretOrKey, {
      expiresIn: "30m"
   });

   return token;
};

UserSchema.methods.toJSON = function() {
   const user = this;
   const userObject = user.toObject();

   delete userObject.password;

   return userObject;
};

// hash the plain text password before saving
UserSchema.pre("save", async function(next) {
   const user = this;
   if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
   }
});

module.exports = User = mongoose.model("user", UserSchema);
