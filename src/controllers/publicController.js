const City = require("../models/City");
const Combo = require("../models/montarCombos");
const CategoryPlan = require("../models/CategoryPlan");

exports.getCombosByCityPublic = async (req, res) => {
  try {
    const cities = await City.find({ isActive: true }).sort({ name: 1 });

    const result = await Promise.all(
      cities.map(async (city) => {
        const combos = await Combo.find({ cityId: city._id, isVisible: true })
          .sort({ order: 1 })
          .populate({
            path: "planos",
            match: { isVisible: true },
            options: { sort: { order: 1 } },
          });

        return { [city.name]: combos };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor", error: error.message });
  }
};

exports.getCategoriesByCityPublic = async (req, res) => {
  try {
    const cities = await City.find({ isActive: true }).sort({ name: 1 });

    const result = await Promise.all(
      cities.map(async (city) => {
        const categories = await CategoryPlan.find({
          cityId: city._id,
          isVisible: true,
        }).sort({ order: 1 });

        const formatted = categories.map((cat) => ({
          _id: cat._id,
          nome: cat.nome,
          logo: cat.logo,
          order: cat.order,
          images: cat.images.filter((img) => img.isVisible).sort((a, b) => a.order - b.order),
        }));

        return { [city.name]: formatted };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor", error: error.message });
  }
};
