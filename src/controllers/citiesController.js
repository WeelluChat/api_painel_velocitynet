const City = require("../models/City");

const INITIAL_CITIES = [
  { name: "Parauapebas", slug: "parauapebas" },
  { name: "Canaã dos Carajás", slug: "canaa-dos-carajas" },
];

// Seed initial cities if collection is empty
exports.seedCities = async () => {
  const count = await City.countDocuments();
  if (count === 0) {
    await City.insertMany(INITIAL_CITIES);
  }
};

// GET /cities
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find({});
    res.status(200).json(cities);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Erro ao buscar cidades", error: error.message });
  }
};

// POST /cities
exports.createCity = async (req, res) => {
  try {
    const { name, slug, isActive } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ msg: "name e slug são obrigatórios" });
    }
    const city = new City({ name, slug, isActive });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ msg: "Slug já existe", error: error.message });
    }
    res.status(500).json({ msg: "Erro ao criar cidade", error: error.message });
  }
};

// PUT /cities/:id
exports.updateCity = async (req, res) => {
  try {
    const { name, slug, isActive } = req.body;
    const city = await City.findByIdAndUpdate(
      req.params.id,
      { $set: { name, slug, isActive } },
      { new: true, runValidators: true },
    );
    if (!city) return res.status(404).json({ msg: "Cidade não encontrada" });
    res.status(200).json(city);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Erro ao atualizar cidade", error: error.message });
  }
};

// DELETE /cities/:id
exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ msg: "Cidade não encontrada" });
    res.status(200).json({ msg: "Cidade deletada com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Erro ao deletar cidade", error: error.message });
  }
};
