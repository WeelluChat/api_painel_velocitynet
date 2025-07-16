const mongoose = require("mongoose");

const Slider = mongoose.Schema({
  desktop: {
    name: String,
    dateSlider: String,
  },
  mobile: {
    name: String,
    dateSlider: String,
  },
});

module.exports = Slider;
