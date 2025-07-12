const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryPlan = mongoose.model("category_plan", {
  nome: String,
  logo: String,
  isVisible: {
    type: Boolean,
    default: true,
  },
  images: [
    {
      filename: String,
      isVisible: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

module.exports = CategoryPlan;
