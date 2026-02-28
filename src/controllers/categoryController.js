const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");

exports.categoryGet = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryPost = async (req, res) => {
  if (!req.file) {
    return res.status(422).json({ msg: "Imagem inválida" });
  }

  const category = new Category({ name: req.file.originalname });

  try {
    await category.save();
    res.status(201).json({ msg: "Imagem salva" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryPatch = async (req, res) => {
  if (!req.file) {
    return res.status(422).json({ msg: "Imagem inválida" });
  }

  const { id } = req.body;

  try {
    await Category.updateOne({ _id: id }, { $set: { name: req.file.originalname } });
    res.status(200).json({ msg: "Imagem alterada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await Category.deleteOne({ _id: id });
    res.status(200).json({ msg: "Imagem deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
