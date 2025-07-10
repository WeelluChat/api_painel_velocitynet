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
