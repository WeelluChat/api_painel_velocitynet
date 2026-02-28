const CardPlan = require("../models/CardPlan");

exports.cardPlanGetAll = async (req, res) => {
  try {
    const cardPlan = await CardPlan.find({});
    res.status(200).json(cardPlan);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardPlanGet = async (req, res) => {
  const { idCategory } = req.body;
  try {
    const cardPlan = await CardPlan.find({ idCategory });
    res.status(200).json(cardPlan);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardPlanCreate = async (req, res) => {
  const { idCategory } = req.body;
  const files = req.files;
  try {
    for (const file of files) {
      const cardPlan = new CardPlan({ idCategory, imagem: file.filename });
      await cardPlan.save();
    }
    res.status(201).json({ msg: "Card cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardPlanDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await CardPlan.deleteOne({ _id: id });
    res.status(200).json({ msg: "Card deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
