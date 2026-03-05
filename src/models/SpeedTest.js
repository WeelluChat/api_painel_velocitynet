const mongoose = require("mongoose");

const speedTestSchema = new mongoose.Schema({
  desktopImage: {
    name: String,
  },
  mobileImage: {
    name: String,
  },
  redirectUrl: {
    type: String,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("SpeedTest", speedTestSchema);
