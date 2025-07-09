const mongoose = require("mongoose");

const Perguntas = new mongoose.model("Perguntas", {
    title: String,
    subtitle: String,
});

module.exports = Perguntas;