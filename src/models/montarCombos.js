const mongoose = require("mongoose");

const montarCombo = new mongoose.Schema({
    title: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    planos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plano" }],
});

module.exports = mongoose.model("Combo", montarCombo);
