const Complement = require("../models/Complement");

exports.complementGetByID = async (req, res) => {
  const { idPlan } = req.body;
  try {
    const complement = await Complement.find({ idPlan });
    res.status(200).json(complement);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.complementGet = async (req, res) => {
  try {
    const complement = await Complement.find({});
    res.status(200).json(complement);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.complementCreate = async (req, res) => {
  const { nome, idPlan } = req.body;
  const image = req.file?.filename ?? null;

  const complement = new Complement({ nome, image, idPlan });

  try {
    await complement.save();
    res.status(201).json({ msg: "Complemento cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.complementDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await Complement.deleteOne({ _id: id });
    res.status(200).json({ msg: "Complemento deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.complementPatch = async (req, res) => {
  const { id, nome, idPlan, status } = req.body;

  const fields = {};
  if (req.file) fields.image = req.file.filename;
  if (nome !== undefined) fields.nome = nome;
  if (idPlan !== undefined) fields.idPlan = idPlan;
  if (status !== undefined) fields.status = status;

  try {
    await Complement.updateOne({ _id: id }, { $set: fields });
    res.status(200).json({ msg: "Complemento alterado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
