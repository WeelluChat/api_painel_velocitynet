const mongoose = require("mongoose");

const Beneficio = new mongoose.Schema({
    nome: { type: String, required: true },
    valor: { type: Number, required: true },
    image: { type: String, required: true },
});

const Plano = new mongoose.Schema({
    nome: { type: String, required: true },
    velocidade: { type: Number, required: true },
    valor: { type: Number, required: true },
    beneficios: [Beneficio],
});

module.exports = mongoose.model("Plano", Plano);
