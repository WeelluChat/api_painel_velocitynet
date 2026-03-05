const mongoose = require("mongoose");

const rotatingBannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("RotatingBanner", rotatingBannerSchema);
