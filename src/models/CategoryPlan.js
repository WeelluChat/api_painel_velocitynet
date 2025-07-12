const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryPlan = mongoose.model("category_plan", {
  nome: String,
  logo: String,
  isVisible: {
    default: true,
    type: Boolean,
  },
  subTitulo: {
    default: null,
    type: String,
  },
  visualizacao: String,
  status: {
    type: Boolean,
    default: true,
  },
  images: {
    type: Schema.Types.Array,
    isVisible: {
      default: true,
      type: Boolean,
    },
  },
});

module.exports = CategoryPlan;
