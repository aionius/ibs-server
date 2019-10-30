const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateCCInput = data => {
   let errors = {};

   data.credit_card_name = !isEmpty(data.credit_card_name)
      ? data.credit_card_name
      : "";
   data.credit_card_number = !isEmpty(data.credit_card_number)
      ? data.credit_card_number
      : "";
   data.expiration_date = !isEmpty(data.expiration_date)
      ? data.expiration_date
      : "";

   if (Validator.isEmpty(data.credit_card_name)) {
      errors.cc = "Credit Card Name field is required";
   }

   if (!Validator.isCreditCard(data.credit_card_number)) {
      errors.cc = "Credit Card Number invalid.";
   }
   if (Validator.isEmpty(data.credit_card_number)) {
      error.cc = "Credit Card Number field is required";
   }

   if (Validator.isEmpty(data.expiration_date)) {
      errors.cc = "Expiration Date is required";
   }

   return {
      errors,
      isValid: isEmpty(errors)
   };
};
