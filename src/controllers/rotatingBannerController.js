const RotatingBanner = require("../models/RotatingBanner");

// GET - retorna o banner rotativo (único documento)
exports.rotatingBannerGet = async (req, res) => {
  try {
    const banner = await RotatingBanner.findOne({});
    if (!banner) {
      return res.status(404).json({ msg: "Banner rotativo não encontrado" });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar banner rotativo", error: error.message });
  }
};

// PUT - cria ou atualiza o banner rotativo (upsert - apenas 1 documento)
exports.rotatingBannerPut = async (req, res) => {
  const { image, enabled } = req.body;

  if (!image) {
    return res.status(422).json({ msg: "Campo 'image' é obrigatório" });
  }

  const updateData = { image };
  if (enabled !== undefined) updateData.enabled = enabled;

  try {
    const banner = await RotatingBanner.findOneAndUpdate(
      {},
      updateData,
      { upsert: true, new: true }
    );
    res.status(200).json({ msg: "Banner rotativo salvo com sucesso", banner });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao salvar banner rotativo", error: error.message });
  }
};
