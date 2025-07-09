const mongoose = require("mongoose");

const Detalhes = new mongoose.Schema({
    idCombo: String,
    text: { type: String, required: true },
    icon: { type: String, required: true },
});

const Beneficio = new mongoose.Schema({
    idCombo: String,
    nome: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    valor: { type: Number, required: true },
    image: { type: String, required: true },
});

const Plano = new mongoose.Schema({
    idCombo: String,
    nome: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    velocidade: { type: Number, required: true },
    valor: { type: Number, required: true },
    beneficios: [Beneficio],
    detalhes: [Detalhes],
});

module.exports = mongoose.model("Plano", Plano);
