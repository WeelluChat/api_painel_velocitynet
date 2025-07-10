const Combo = require("../models/montarCombos");
const Plano = require("../models/montarPlanos"); // importante: plano separado se for referenciado

// GET all combos
exports.CombosGet = async (req, res) => {
    try {
        const combos = await Combo.find().populate("planos"); // Populate para retornar os dados completos dos planos
        res.send(combos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// POST new combo
exports.CombosPost = async (req, res) => {
    try {
        const novoCombo = new Combo({
            title: req.body.title,
            isVisible: req.body.isVisible,
            planos: req.body.planos, // Array de ObjectId de planos
        });

        await novoCombo.save();
        res.status(201).send(novoCombo);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
};

// PUT combo completo
exports.CombosPut = async (req, res) => {
    try {
        const comboAtualizado = await Combo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.send(comboAtualizado);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// DELETE combo
exports.CombosDelete = async (req, res) => {
    try {
        const comboDeletado = await Combo.findByIdAndDelete(req.params.id);
        res.send(comboDeletado);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Atualizar plano via IDs no body
exports.AtualizarPlanoViaBody = async (req, res) => {
    try {
        const { planoId, ...updateData } = req.body;

        const plano = await Plano.findById(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        Object.assign(plano, updateData);

        await plano.save();
        res.send(plano);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Atualizar benefício via IDs no body
exports.AtualizarBeneficioViaBody = async (req, res) => {
    try {
        const { planoId, beneficioId, ...updateData } = req.body;

        const plano = await Plano.findById(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        const beneficio = plano.beneficios.id(beneficioId);
        if (!beneficio) return res.status(404).send({ message: "Benefício não encontrado" });

        Object.assign(beneficio, updateData);

        await plano.save();
        res.send(plano);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Atualizar detalhe via IDs no body
exports.AtualizarDetalheViaBody = async (req, res) => {
    try {
        const { planoId, detalheId, ...updateData } = req.body;

        const plano = await Plano.findById(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        const detalhe = plano.detalhes.id(detalheId);
        if (!detalhe) return res.status(404).send({ message: "Detalhe não encontrado" });

        Object.assign(detalhe, updateData);

        await plano.save();
        res.send(plano);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
