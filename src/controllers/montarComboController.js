const Combo = require("../models/montarCombos");

// GET todos os combos
exports.CombosGet = async (req, res) => {
    try {
        const combos = await Combo.find();
        res.send(combos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// POST criar novo combo
exports.CombosPost = async (req, res) => {
    try {
        const { title, isVisible, planos } = req.body;

        const novoCombo = new Combo({
            icon,
            title,
            isVisible,
            planos: Array.isArray(planos) ? planos : [],
        });

        await novoCombo.save();
        res.status(201).send(novoCombo);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
};

// PUT atualizar combo inteiro
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

// PATCH plano
exports.AtualizarPlanoViaBody = async (req, res) => {
    try {
        const { comboId, planoId, ...updateData } = req.body;

        const combo = await Combo.findById(comboId);
        if (!combo) return res.status(404).send({ message: "Combo não encontrado" });

        const plano = combo.planos.id(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        Object.assign(plano, updateData);
        await combo.save();

        res.send(plano);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// PATCH benefício
exports.AtualizarBeneficioViaBody = async (req, res) => {
    try {
        const { comboId, planoId, beneficioId, ...updateData } = req.body;

        const combo = await Combo.findById(comboId);
        if (!combo) return res.status(404).send({ message: "Combo não encontrado" });

        const plano = combo.planos.id(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        const beneficio = plano.beneficios.id(beneficioId);
        if (!beneficio) return res.status(404).send({ message: "Benefício não encontrado" });

        Object.assign(beneficio, updateData);
        await combo.save();

        res.send(beneficio);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// PATCH detalhe
exports.AtualizarDetalheViaBody = async (req, res) => {
    try {
        const { comboId, planoId, detalheId, ...updateData } = req.body;

        const combo = await Combo.findById(comboId);
        if (!combo) return res.status(404).send({ message: "Combo não encontrado" });

        const plano = combo.planos.id(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        const detalhe = plano.detalhes.id(detalheId);
        if (!detalhe) return res.status(404).send({ message: "Detalhe não encontrado" });

        Object.assign(detalhe, updateData);
        await combo.save();

        res.send(detalhe);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// PATCH imagem do benefício (agora recebendo string em req.body.image)
exports.AtualizarImagemBeneficio = async (req, res) => {
    try {
        const { comboId, planoId, beneficioId, image } = req.body;

        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Campo 'image' é obrigatório (como string)"
            });
        }

        const combo = await Combo.findById(comboId);
        if (!combo) return res.status(404).json({ success: false, message: "Combo não encontrado" });

        const plano = combo.planos.id(planoId);
        if (!plano) return res.status(404).json({ success: false, message: "Plano não encontrado" });

        const beneficio = plano.beneficios.id(beneficioId);
        if (!beneficio) return res.status(404).json({ success: false, message: "Benefício não encontrado" });

        beneficio.image = image;
        await combo.save();

        res.json({
            success: true,
            message: "Imagem do benefício atualizada com sucesso",
            beneficio: beneficio.toObject()
        });

    } catch (error) {
        console.error("Erro ao atualizar imagem:", error);
        res.status(500).json({
            success: false,
            error: "Erro ao atualizar imagem",
            details: error.message
        });
    }
};
