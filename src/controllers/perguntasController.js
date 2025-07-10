const Perguntas = require("../models/perguntas");

exports.perguntasGet = async (req, res) => {
    try {
        const comentario = await Perguntas.find();
        res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({ msg: "Error no servidor " });
    };
};

exports.pergutasPost = async (req, res) => {
    const novaPergunta = new Perguntas({
        title: req.body.title,
        subtitle: req.body.subtitle,
    });
    try {
        await novaPergunta.save();
        res.status(200).json({ msg: "Pergunta salva com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Error no servidor " });
    };
};

exports.perguntasDelete = async (req, res) => {
    const { id } = req.params;
    try {
        await Perguntas.deleteOne({ _id: id });
        res.status(200).json({ msg: "Pergunta deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Error no servidor " });
    };
};

exports.perguntasPut = async (req, res) => {
    const { id, title, subtitle } = req.body;
    try {
        const result = await Perguntas.updateOne(
            { _id: id },
            { $set: { title: title, subtitle: subtitle } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ msg: "Pergunta não encontrada" });
        }

        if (result.modifiedCount === 0) {
            return res.status(200).json({ msg: "Nenhuma modificação foi feita" });
        }

        res.status(200).json({ msg: "Pergunta atualizada com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro no servidor", error: error.message });
    }
};

