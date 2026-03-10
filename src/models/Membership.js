const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Membership", membershipSchema);
