const Planos = require("../models/montarCombos");

// GET all combos
exports.CombosGet = async (req, res) => {
    try {
        const getPlanos = await Planos.find();
        res.send(getPlanos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// POST new combo
exports.CombosPost = async (req, res) => {
    try {
        const novoPlano = new Planos({
            title: req.body.title,
            isVisible: req.body.isVisible,
            planos: req.body.planos,
        });

        await novoPlano.save();
        res.status(201).send(novoPlano);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
};

// PUT combo completo (parcial ou total)
exports.CombosPut = async (req, res) => {
    try {
        const updateCombo = await Planos.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.send(updateCombo);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// DELETE combo
exports.CombosDelete = async (req, res) => {
    try {
        const deleteCombo = await Planos.findByIdAndDelete(req.params.id);
        res.send(deleteCombo);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// ----------- ATUALIZAÇÕES VIA ID NO BODY ------------

// Atualizar plano via IDs no body
exports.AtualizarPlanoViaBody = async (req, res) => {
    try {
        const { comboId, planoId, ...updateData } = req.body;

        const combo = await Planos.findById(comboId);
        if (!combo) return res.status(404).send({ message: "Combo não encontrado" });

        const plano = combo.planos.id(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        Object.assign(plano, updateData);

        await combo.save();
        res.send(combo);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Atualizar benefício via IDs no body
exports.AtualizarBeneficioViaBody = async (req, res) => {
    try {
        const { comboId, planoId, beneficioId, ...updateData } = req.body;

        const combo = await Planos.findById(comboId);
        if (!combo) return res.status(404).send({ message: "Combo não encontrado" });

        const plano = combo.planos.id(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        const beneficio = plano.beneficios.id(beneficioId);
        if (!beneficio) return res.status(404).send({ message: "Benefício não encontrado" });

        Object.assign(beneficio, updateData);

        await combo.save();
        res.send(combo);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Atualizar detalhe via IDs no body
exports.AtualizarDetalheViaBody = async (req, res) => {
    try {
        const { comboId, planoId, detalheId, ...updateData } = req.body;

        const combo = await Planos.findById(comboId);
        if (!combo) return res.status(404).send({ message: "Combo não encontrado" });

        const plano = combo.planos.id(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        const detalhe = plano.detalhes.id(detalheId);
        if (!detalhe) return res.status(404).send({ message: "Detalhe não encontrado" });

        Object.assign(detalhe, updateData);

        await combo.save();
        res.send(combo);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
