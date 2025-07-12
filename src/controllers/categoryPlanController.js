const CategoryPlan = require("../models/CategoryPlan");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// === Configuração interna do multer ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/category";
    // Cria a pasta caso não exista
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Middleware para upload de logo e images juntos
exports.uploadCategoryFields = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

// Middleware para upload só do logo
exports.uploadLogoOnly = upload.single("logo");

// Middleware para upload só das images
exports.uploadImagesOnly = upload.array("images", 10);

// === Controllers ===

// GET - Buscar todas as categorias
exports.categoryPlanGet = async (req, res) => {
  try {
    const categories = await CategoryPlan.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar categorias", error: error.message });
  }
};

// POST - Criar nova categoria com logo e imagens
exports.categoryPlanCreate = async (req, res) => {
  const { nome, visualizacao, isVisible } = req.body;

  const logo = req.files?.logo?.[0]?.filename;
  const imagesFiles = req.files?.images || [];

  const images = imagesFiles.map(file => ({
    filename: file.filename,
    isVisible: true,
  }));

  const categoryPlan = new CategoryPlan({
    nome,
    logo,
    visualizacao,
    isVisible: isVisible !== undefined ? isVisible : true,
    images,
  });

  try {
    await categoryPlan.save();
    res.status(200).json({ msg: "Categoria cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao cadastrar categoria", error: error.message });
  }
};

// PATCH - Atualizar dados da categoria e (opcionalmente) o logo
exports.categoryPlanPatch = async (req, res) => {
  const { id, nome, visualizacao, isVisible } = req.body;
  const logo = req.file?.filename;

  const updateFields = {};
  if (nome !== undefined) updateFields.nome = nome;
  if (visualizacao !== undefined) updateFields.visualizacao = visualizacao;
  if (isVisible !== undefined) updateFields.isVisible = isVisible;
  if (logo) updateFields.logo = logo;

  try {
    await CategoryPlan.updateOne({ _id: id }, { $set: updateFields });
    res.status(200).json({ msg: "Categoria atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar categoria", error: error.message });
  }
};

// PATCH - Adicionar novas imagens (cards)
exports.categoryPlanCreateCard = async (req, res) => {
  const { idCategory } = req.body;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ msg: "Nenhuma imagem enviada." });
  }

  try {
    const imageObjects = files.map(file => ({
      filename: file.filename,
      isVisible: true,
    }));

    await CategoryPlan.updateOne(
      { _id: idCategory },
      { $push: { images: { $each: imageObjects } } }
    );

    res.status(200).json({ msg: "Imagens adicionadas com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao adicionar imagens", error: error.message });
  }
};

// DELETE - Deletar categoria
exports.categoryPlanDelete = async (req, res) => {
  const { id } = req.body;

  try {
    await CategoryPlan.deleteOne({ _id: id });
    res.status(200).json({ msg: "Categoria deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar categoria", error: error.message });
  }
};

// DELETE - Remover imagem específica da categoria
exports.categoryPlanDeleteCard = async (req, res) => {
  const { cardName, idCategory } = req.body;

  try {
    await CategoryPlan.updateOne(
      { _id: idCategory },
      { $pull: { images: { filename: cardName } } }
    );

    res.status(200).json({ msg: "Imagem removida com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao remover imagem", error: error.message });
  }
};
