const mongoose = require("mongoose");

const Slider = mongoose.model("slider", {
  name: String,
  dateSlider: String,
});

module.exports = Slider;
