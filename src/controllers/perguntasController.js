const Perguntas = require("../models/perguntas");

exports.perguntasGet = async (req, res) => {
  try {
    const perguntas = await Perguntas.find();
    res.status(200).json(perguntas);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.perguntasPost = async (req, res) => {
  const novaPergunta = new Perguntas({
    title: req.body.title,
    subtitle: req.body.subtitle,
  });
  try {
    await novaPergunta.save();
    res.status(201).json({ msg: "Pergunta salva com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.perguntasDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await Perguntas.deleteOne({ _id: id });
    res.status(200).json({ msg: "Pergunta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.perguntasPut = async (req, res) => {
  const { id } = req.params;
  try {
    await Perguntas.updateOne({ _id: id }, { $set: req.body });
    res.status(200).json({ msg: "Pergunta atualizada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

