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
        type: Number,
        required: true,
        min: 1,
        max: 255,
      },
      productPrice: {
        type: Number,
        required: true,
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("ShoppingCart", shoppingCartSchema);
