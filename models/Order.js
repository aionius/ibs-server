const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user"
   },
   order: [
      {
         order_number: {
            type: String
         },
         total: {
            type: Number
         },
         shipping_fee: {
            type: Number
         },
         tax: {
            type: Number
         },
         items: [
            {
               item_id: {
                  type: String
               },
               item_quantity: {
                  type: Number
               },
               item_price: {
                  type: Number
               },
               item_type: {
                  type: String
               }
            }
         ]
      }
   ]
});

module.exports = Order = mongoose.model("Order", OrderSchema);
