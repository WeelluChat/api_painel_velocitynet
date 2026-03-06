const Membership = require("../models/Membership");

// GET - retorna o membership (único documento)
exports.membershipGet = async (req, res) => {
  try {
    const membership = await Membership.findOne({});
    if (!membership) {
      return res.status(404).json({ msg: "Membership não encontrado" });
    }
    res.status(200).json(membership);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar membership", error: error.message });
  }
};

// PUT - cria ou atualiza o membership (upsert - apenas 1 documento)
exports.membershipPut = async (req, res) => {
  const { image, title, description, redirectUrl, color, enabled } = req.body;

  if (!image) return res.status(422).json({ msg: "Campo 'image' é obrigatório" });
  if (!title) return res.status(422).json({ msg: "Campo 'title' é obrigatório" });
  if (!description) return res.status(422).json({ msg: "Campo 'description' é obrigatório" });
  if (!redirectUrl) return res.status(422).json({ msg: "Campo 'redirectUrl' é obrigatório" });
  if (!color) return res.status(422).json({ msg: "Campo 'color' é obrigatório" });

  const updateData = { image, title, description, redirectUrl, color };
  if (enabled !== undefined) updateData.enabled = enabled;

  try {
    const membership = await Membership.findOneAndUpdate(
      {},
      updateData,
      { upsert: true, new: true }
    );
    res.status(200).json({ msg: "Membership salvo com sucesso", membership });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao salvar membership", error: error.message });
  }
};
