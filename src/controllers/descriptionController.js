const CardSectionTitle = require("../models/CardSectionTitle");
const Card = require("../models/Card");

exports.cardTitleSectionGet = async (req, res) => {
  try {
    const cardTitle = await CardSectionTitle.findOne({});
    res.status(200).json(cardTitle);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardTitleSectionPost = async (req, res) => {
  const { name } = req.body;
  const cardTitle = new CardSectionTitle({ name });

  try {
    await cardTitle.save();
    res.status(201).json({ msg: "Título da seção card salvo com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardTitleSectionPatch = async (req, res) => {
  const { id, name } = req.body;

  try {
    await CardSectionTitle.updateOne({ _id: id }, { $set: { name } });
    res.status(200).json({ msg: "Título da seção card alterado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardGet = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardPost = async (req, res) => {
  const { name, description, logo, icon } = req.body;
  const card = new Card({ name, description, logo, icon });

  try {
    await card.save();
    res.status(201).json({ msg: "Card salvo com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardPatch = async (req, res) => {
  const { id, name, description, logo, icon } = req.body;

  try {
    await Card.updateOne({ _id: id }, { $set: { name, description, logo, icon } });
    res.status(200).json({ msg: "Card alterado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await Card.deleteOne({ _id: id });
    res.status(200).json({ msg: "Card deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
