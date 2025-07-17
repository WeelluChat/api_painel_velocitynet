const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
  desktop: {
    name: String,
    dateSlider: String,
  },
  mobile: {
    name: String,
    dateSlider: String,
  },
});

const Slider = mongoose.model("slider", SliderSchema);

module.exports = Slider;
