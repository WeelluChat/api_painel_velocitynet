const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  desktop: {
    name: String,
  },
  mobile: {
    name: String,
  },
});

module.exports = mongoose.model("Slider", sliderSchema);
