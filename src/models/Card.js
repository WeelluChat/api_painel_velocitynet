const mongoose = require("mongoose");

const Card = mongoose.model("card", {
  name: String,
  description: String,
  logo: String,
});

module.exports = Card;
