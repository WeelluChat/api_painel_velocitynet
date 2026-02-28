const Cards = require("../models/cards");

exports.cardsGet = async (req, res) => {
  try {
    const cardsList = await Cards.find({});
    res.status(200).json(cardsList);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardsPost = async (req, res) => {
  try {
    const { title, isVisible, cards } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Campo 'title' é obrigatório" });
    }

    if (cards && (!Array.isArray(cards) || cards.some((c) => typeof c !== "object" || !c.image))) {
      return res.status(400).json({ msg: "O campo 'cards' deve ser um array de objetos com campo 'image'" });
    }

    const novoCards = new Cards({ title, isVisible, cards: cards || [] });
    const savedCards = await novoCards.save();
    res.status(201).json(savedCards);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardsPut = async (req, res) => {
  try {
    const updatedCards = await Cards.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCards) {
      return res.status(404).json({ msg: "Cards não encontrado" });
    }

    res.status(200).json(updatedCards);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardsPatch = async (req, res) => {
  try {
    const { id, cards } = req.body;

    if (!id) {
      return res.status(400).json({ msg: "Campo 'id' é obrigatório" });
    }

    if (!Array.isArray(cards) || cards.some((c) => typeof c !== "object" || !c.image)) {
      return res.status(400).json({ msg: "O campo 'cards' deve ser um array de objetos com campo 'image'" });
    }

    const updatedCards = await Cards.findByIdAndUpdate(
      id,
      { cards },
      { new: true, runValidators: true }
    );

    if (!updatedCards) {
      return res.status(404).json({ msg: "Cards não encontrado" });
    }

    res.status(200).json(updatedCards);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.cardsDelete = async (req, res) => {
  try {
    const deleted = await Cards.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Cards não encontrado" });
    }
    res.status(200).json({ msg: "Cards deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
