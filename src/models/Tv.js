const mongoose = require("mongoose");

const Tv = mongoose.model("tv", {
  title: String,
  description: String,
  image: String,
});

module.exports = Tv;
