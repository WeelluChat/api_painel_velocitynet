const CardSectionTitle = require("../models/CardSectionTitle");
const Card = require("../models/Card");

exports.cardTitleSectionGet = async (req, res) => {
  const cardTitle = await CardSectionTitle.findOne({});

  try {
    res.status(200).json(cardTitle);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};

exports.cardTitleSectionPost = async (req, res) => {
  const { name } = req.body;

  const cardTitle = new CardSectionTitle({
    name,
  });

  try {
    await cardTitle.save();
    res.status(200).json({ msg: "Titulo da sessão card salvo com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};

exports.cardTitleSectionPatch = async (req, res) => {
  const { id, name } = req.body;

  try {
    await CardSectionTitle.updateOne({ _id: id }, { $set: { name: name } });
    res.status(200).json({
      msg: "Title da seção card alterado com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};

exports.cardGet = async (req, res) => {
  const cards = await Card.find();

  try {
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};

exports.cardPost = async (req, res) => {
  const { name, description, logo, icon } = req.body;

  const card = new Card({
    name: name,
    description: description,
    logo: logo,
    icon: icon,
  });

  try {
    await card.save();
    res.status(200).json({ msg: "Card salvo com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};

exports.cardPatch = async (req, res) => {
  const { id, name, description, logo, icon } = req.body;

  try {
    await Card.updateOne(
      { _id: id },
      { $set: { name: name, description: description, logo: logo, icon: icon } }
    );
    res.status(200).json({
      msg: "Card alterado com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};

exports.cardDelete = async (req, res) => {
  const id = req.params.id;

  try {
    await Card.deleteOne({ _id: id });
    res.status(200).json({ msg: "Card deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};
