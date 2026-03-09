const mongoose = require("mongoose");

const appConfigSchema = new mongoose.Schema({
  firstShown: {
    type: String,
    enum: ["combos", "categories"],
    default: "combos",
  },
});

module.exports = mongoose.model("AppConfig", appConfigSchema);
