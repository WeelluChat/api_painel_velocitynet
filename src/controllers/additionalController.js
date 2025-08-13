const Additional = require("../models/Additional");

exports.additionalGet = async (req, res) => {
  try {
    const additionals = await Additional.find({});
    if (additionals.length > 0) {
      res.status(200).json(additionals);
    } else {
      res.status(404).json({ msg: "Nenhum adicional encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.additionalPost = async (req, res) => {
  const { name, isVisible, isIncluded, color, benefitsDetails, image } =
    req.body;

  if (!name || !image) {
    return res.status(422).json({ msg: "Nome e imagem são obrigatórios!" });
  }

  const additional = new Additional({
    name,
    isVisible,
    isIncluded,
    color,
    benefitsDetails,
    image,
    benefitsDetails,
    image,
  });

  try {
    await additional.save();
    res.status(201).json({ msg: "Adicional criado com sucesso!" });
  } catch (e) {
    res.status(200).json({ msg: "Erro no servidor!" });
  }
};

exports.additionalPatch = async (req, res) => {
  const { id, ...updateData } = req.body;

  if (!id) {
    return res.status(422).json({ msg: "ID é obrigatório!" });
  }

  try {
    await Additional.updateOne({ _id: id }, { $set: updateData });
    res.status(200).json({ msg: "Adicional atualizado com sucesso!" });
  } catch (e) {
    res.status(500).json({ msg: "Erro no servidor!" });
  }
};

exports.additionalDelete = async (req, res) => {
  const { id } = req.body;

  try {
    Additional.deleteOne({ _id: id });
    res.status(200).json({ msg: "Adicional deletado com sucesso!" });
  } catch (e) {
    res.status(500).json({ msg: "Erro no servidor!" });
  }
};
