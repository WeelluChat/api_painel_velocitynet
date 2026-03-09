const AppConfig = require("../models/AppConfig");

// GET /app-config — returns the singleton config, creating it if missing
exports.getConfig = async (req, res) => {
  try {
    let config = await AppConfig.findOne({});
    if (!config) {
      config = await AppConfig.create({});
    }
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar configuração", error: error.message });
  }
};

// PATCH /app-config — updates firstShown field
exports.patchConfig = async (req, res) => {
  try {
    const { firstShown } = req.body;
    if (!["combos", "categories"].includes(firstShown)) {
      return res.status(400).json({ msg: "firstShown deve ser 'combos' ou 'categories'" });
    }

    let config = await AppConfig.findOne({});
    if (!config) {
      config = await AppConfig.create({ firstShown });
    } else {
      config.firstShown = firstShown;
      await config.save();
    }

    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar configuração", error: error.message });
  }
};
