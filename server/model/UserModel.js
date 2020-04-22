const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  userAddress: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  userEmail: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  userMobile: {
    type: String,
    required: true,
    min: 10,
  },
  userPassword: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});

module.exports = mongoose.model("Users", userSchema);
