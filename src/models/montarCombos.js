const mongoose = require("mongoose");

const montarCombo = new mongoose.Schema({
    title: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    planos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plano" }],
});

module.exports = mongoose.model("Combo", montarCombo);
