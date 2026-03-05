const mongoose = require("mongoose");

const speedTestSchema = new mongoose.Schema({
  image: {
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
