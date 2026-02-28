const Offer = require("../models/Offer");

exports.offerGet = async (req, res) => {
  try {
    const offer = await Offer.find();
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.offerPost = async (req, res) => {
  const { title, description, value } = req.body;
  const image = req.file?.filename ?? null;

  const offer = new Offer({ title, description, value, image });

  try {
    await offer.save();
    res.status(201).json({ msg: "Oferta salva com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.offerPatch = async (req, res) => {
  const id = req.params.id ?? req.body.id;
  const { title, description, value } = req.body;
  const image = req.file ? req.file.filename : null;

  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (value !== undefined) updateFields.value = value;
  if (image !== null) updateFields.image = image;

  try {
    await Offer.updateOne({ _id: id }, { $set: updateFields });
    res.status(200).json({ msg: "Oferta atualizada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.offerDelete = async (req, res) => {
  const { id } = req.body;

  try {
    await Offer.deleteOne({ _id: id });
    res.status(200).json({ msg: "Oferta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
