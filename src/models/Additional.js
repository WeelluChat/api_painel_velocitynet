const mongoose = require("mongoose");
const { Schema } = mongoose;

const Additional = mongoose.model("additional", {
  name: {
    type: String,
    required: true,
  },
  seletor: {
    type: Boolean,
    default: false,
    required: false
  },
  color: {
    type: String,
    default: "ff000000",
  },
  benefitsDetails: {
    type: [{ text: String }],
    default: [],
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = Additional;
