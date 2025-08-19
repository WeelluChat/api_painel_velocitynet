const mongoose = require("mongoose");

const Card = mongoose.model("card", {
  name: String,
  description: String,
  logo: String,
  icon: Number,
  validation: {
    type: Boolean,
    default: true,
  },
});

module.exports = Card;
