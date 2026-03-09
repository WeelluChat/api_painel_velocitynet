const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryPlan = mongoose.model("category_plan", new Schema({
  nome: String,
  logo: String,
  isVisible: {
    type: Boolean,
    default: true,
  },
  order: { type: Number, default: 0 },
  cityId: { type: Schema.Types.ObjectId, ref: "City" },
  images: [
    {
      filename: String,
      isVisible: {
        type: Boolean,
        default: true,
      },
    },
  ],
}));

module.exports = CategoryPlan;
