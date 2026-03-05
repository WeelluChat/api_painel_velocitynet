const mongoose = require("mongoose");

const speedTestSchema = new mongoose.Schema({
  image: {
    name: String,
  },
  redirectUrl: {
    type: String,
  },
});

module.exports = mongoose.model("SpeedTest", speedTestSchema);
