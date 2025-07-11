const mongoose = require("mongoose");
const Planos = require("./montarPlanos");

const montarCombo = new mongoose.Schema({
    title: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    planos: [Planos.schema],
});

module.exports = mongoose.model("Combo", montarCombo);
