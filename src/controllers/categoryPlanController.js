const CategoryPlan = require("../models/CategoryPlan");

// GET todas as categorias
exports.categoryPlanGet = async (req, res) => {
  try {
    const categoryPlan = await CategoryPlan.find({});
    res.status(200).json(categoryPlan);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryPlanCreate = async (req, res) => {
  const { nome, subTitulo, visualizacao, isVisible } = req.body;
  const image = req.file?.filename;

  const categoryPlan = new CategoryPlan({
    nome,
    logo: image,
    subTitulo,
    visualizacao,
    isVisible: isVisible !== undefined ? isVisible : true,
  });

  try {
    await categoryPlan.save();
    res.status(200).json({ msg: "Categoria cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryPlanCreateCard = async (req, res) => {
  const { idCategory } = req.body;
  const files = req.files;

  try {
    const imageObjects = files.map(file => ({
      filename: file.filename,
      isVisible: true,
    }));

    await CategoryPlan.updateOne(
      { _id: idCategory },
      { $push: { images: { $each: imageObjects } } }
    );

    res.status(200).json({ msg: "Card cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryPlanDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await CategoryPlan.deleteOne({ _id: id });
    res.status(200).json({ msg: "Categoria deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryPlanDeleteCard = async (req, res) => {
  const { cardName, idCategory } = req.body;

  try {
    await CategoryPlan.updateOne(
      { _id: idCategory },
      { $pull: { images: { filename: cardName } } }
    );

    res.status(200).json({ msg: "Imagem removida com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.categoryPlanPatch = async (req, res) => {
  const { id, nome, subTitulo, visualizacao, status, isVisible } = req.body;

  const updateFields = {
    nome,
    subTitulo,
    visualizacao,
    status,
  };

  if (isVisible !== undefined) updateFields.isVisible = isVisible;
  if (req.file) updateFields.logo = req.file.filename;

  try {
    await CategoryPlan.updateOne(
      { _id: id },
      { $set: updateFields }
    );

    res.status(200).json({ msg: "Categoria alterada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
