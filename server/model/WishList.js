const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  watchingProducts: [
    {
      productID: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("WishList", wishListSchema);
