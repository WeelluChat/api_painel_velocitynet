const mongoose = require("mongoose");

const Tv = mongoose.model("tv", {
  title: String,
  description: String,
  image: String,
  color: { type: String, default: "ffffffff" },
});

module.exports = Tv;
