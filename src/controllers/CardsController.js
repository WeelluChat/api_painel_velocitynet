const Cards = require("../models/cards");

// GET todos os documentos Cards
exports.CardsGet = async (req, res) => {
  try {
    const cardsList = await Cards.find({});
    if (cardsList.length === 0) {
      return res.status(204).send({ message: "Nenhum card encontrado" });
    }
    res.status(200).json(cardsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST novo documento Cards
exports.CardsPost = async (req, res) => {
  try {
    const { title, isVisible, cards } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Campo 'title' é obrigatório" });
    }

    if (cards && (!Array.isArray(cards) || cards.some(card => typeof card !== "object" || !card.image))) {
      return res.status(400).json({ error: "O campo 'cards' precisa ser um array de objetos com campo 'image'" });
    }

    const novoCards = new Cards({
      title,
      isVisible,
      cards: cards || [],
    });

    const savedCards = await novoCards.save();
    res.status(201).json(savedCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT atualizar documento Cards inteiro (substitui tudo)
exports.CardsPut = async (req, res) => {
  try {
    const updatedCards = await Cards.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCards) {
      return res.status(404).json({ error: "Cards não encontrado" });
    }

    res.status(200).json(updatedCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH atualizar apenas o array cards do documento Cards
exports.CardsPatch = async (req, res) => {
  try {
    const { id, cards } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Campo 'id' é obrigatório" });
    }

    if (!Array.isArray(cards) || cards.some(card => typeof card !== "object" || !card.image)) {
      return res.status(400).json({
        error: "O campo 'cards' precisa ser um array de objetos com campo 'image'",
      });
    }

    const updatedCards = await Cards.findByIdAndUpdate(
      id,
      { cards: cards },
      { new: true, runValidators: true }
    );

    if (!updatedCards) {
      return res.status(404).json({ error: "Cards não encontrado" });
    }

    res.status(200).json(updatedCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE documento Cards por id
exports.CardsDelete = async (req, res) => {
  try {
    const deletedCards = await Cards.findByIdAndDelete(req.params.id);
    if (!deletedCards) {
      return res.status(404).json({ error: "Cards não encontrado para exclusão" });
    }
    res.status(200).json({ message: "Cards deletado com sucesso", deletedCards });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
