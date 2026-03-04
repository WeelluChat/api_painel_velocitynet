const Card = require("../models/Card");


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
