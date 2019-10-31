const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateAddressInput = data => {
   let errors = {};

   data.billing_address1 = !isEmpty(data.billing_address1)
      ? data.billing_address1
      : "";
   data.billing_address2 = !isEmpty(data.billing_address2)
      ? data.billing_address2
      : "";
   data.billing_city = !isEmpty(data.billing_city) ? data.billing_city : "";
   data.billing_state = !isEmpty(data.billing_state) ? data.billing_state : "";
   data.billing_zip = !isEmpty(data.billing_zip) ? data.billing_zip : "";
   data.billing_country = !isEmpty(data.billing_country)
      ? data.billing_country
      : "";

   if (Validator.isEmpty(data.billing_address1)) {
      errors.billing_address1 = "Billing Address1 field is required";
   }

   if (Validator.isEmpty(data.billing_address2)) {
      errors.billing_address2 = "Billing  field is required";
   }

   if (Validator.isEmpty(data.billing_city)) {
      errors.billing_city = "Billing City field is required";
   }

   if (Validator.isEmpty(data.billing_state)) {
      errors.billing_state = "Billing State field is required";
   }

   if (Validator.isEmpty(data.billing_zip)) {
      errors.billing_zip = "Billing Zip code field is required";
   }

   if (Validator.isEmpty(data.billing_country)) {
      errors.billing_country = "Billing Country field is required";
   }

   data.shipping_address1 = !isEmpty(data.shipping_address1)
      ? data.shipping_address1
      : "";
   data.shipping_address2 = !isEmpty(data.shipping_address2)
      ? data.shipping_address2
      : "";
   data.shipping_city = !isEmpty(data.shipping_city) ? data.shipping_city : "";
   data.shipping_state = !isEmpty(data.shipping_state)
      ? data.shipping_state
      : "";
   data.shipping_zip = !isEmpty(data.shipping_zip) ? data.shipping_zip : "";
   data.shipping_country = !isEmpty(data.shipping_country)
      ? data.shipping_country
      : "";
   data.shipping_phonenumber = !isEmpty(data.shipping_phonenumber)
      ? data.shipping_phonenumber
      : "";

   if (Validator.isEmpty(data.shipping_address1)) {
      errors.shipping_address1 = "Shipping Address1 field is required";
   }

   if (Validator.isEmpty(data.shipping_address2)) {
      errors.shipping_address2 = "Shipping Address2 field is required";
   }

   if (Validator.isEmpty(data.shipping_city)) {
      errors.shipping_city = "Shipping City field is required";
   }

   if (Validator.isEmpty(data.shipping_state)) {
      errors.shipping_state = "Shipping State field is required";
   }

   if (Validator.isEmpty(data.shipping_zip)) {
      errors.shipping_zip = "Shipping Zip Code field is required";
   }

   if (Validator.isEmpty(data.shipping_country)) {
      errors.shipping_country = "Shipping Country field is required";
   }

   if (!Validator.isMobilePhone(data.shipping_phonenumber)) {
      errors.shipping_phonenumber = "Please enter a valid phone number.";
   }
   if (Validator.isEmpty(data.shipping_phonenumber)) {
      errors.shipping_phonenumber = "Shipping Phonenumber field is required";
   }
};
