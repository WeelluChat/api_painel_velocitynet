const mongoose = require("mongoose");
const { Schema } = mongoose;

const Additional = mongoose.model("additional", {
  name: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  isIncluded: {
    type: Boolean,
    default: false,
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
