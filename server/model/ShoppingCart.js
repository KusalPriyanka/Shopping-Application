const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },

  cartItems: [
    {
      productID: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
        min: 6,
        max: 255,
      },
      productPrice: {
        type: String,
        required: true,
      },
    },
  ],

  totalPrice: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ShoppingCart", shoppingCartSchema);
