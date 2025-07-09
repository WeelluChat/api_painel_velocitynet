const Planos = require("../models/montarCombos");

exports.CombosGet = async (req, res) => {
    try {
        const getPlanos = await Planos.find();
        res.send(getPlanos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.CombosPost = async (req, res) => {
    try {
        const novoPlano = new Planos({
            title: req.body.title,
            planos: req.body.planos,
        });

        await novoPlano.save();
        res.status(201).send(novoPlano);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
};

exports.CombosPut = async (req, res) => {
    const updateCombo = await Planos.findByIdAndUpdate(req.params.id, req.body, { new: true });
    try {
        res.send(updateCombo);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
