const CategoryPlan = require("../models/CategoryPlan");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// === Configuração do multer ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/category";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// === Middlewares de upload ===
exports.uploadCategoryFields = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "images" },
]);
exports.uploadLogoOnly = upload.single("logo");
exports.uploadImagesOnly = upload.array("images", 10);
exports.uploadImagemUnica = upload.single("imagem"); // novo middleware

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

// POST - Criar nova categoria
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

// PATCH - Atualizar dados de uma categoria
exports.categoryPlanPatch = async (req, res) => {
  const { id } = req.params;
  const { nome, visualizacao, isVisible } = req.body;
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

// PATCH - Adicionar novas imagens
exports.categoryPlanCreateCard = async (req, res) => {
  const { idCategory, isVisible } = req.body;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(200).json({ msg: "Nenhuma imagem enviada. Nenhuma alteração foi feita." });
  }

  try {
    const imageObjects = files.map(file => ({
      filename: file.filename,
      isVisible: true,
    }));

    await CategoryPlan.updateOne(
      { _id: idCategory, isVisible: true},
      { $push: { images: { $each: imageObjects } } }
    );

    res.status(200).json({ msg: "Imagens adicionadas com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao adicionar imagens", error: error.message });
  }
};

// PATCH - Atualizar uma imagem específica (card)
exports.categoryPlanAtualizarImagemCard = async (req, res) => {
  const { idCategoria, nomeAntigoImagem } = req.params;
  const novaImagem = req.file;
  const { isVisible } = req.body;

  if (!novaImagem) {
    return res.status(400).json({ msg: "Nova imagem não enviada." });
  }

  try {
    const categoria = await CategoryPlan.findById(idCategoria);
    if (!categoria) {
      return res.status(404).json({ msg: "Categoria não encontrada." });
    }

    const caminhoAntigo = path.join("uploads/category", nomeAntigoImagem);
    if (fs.existsSync(caminhoAntigo)) {
      fs.unlinkSync(caminhoAntigo);
    }

    const imagensAtualizadas = categoria.images.map(img => {
      if (img.filename === nomeAntigoImagem) {
        return {
          filename: novaImagem.filename,
          isVisible: isVisible !== undefined ? isVisible : img.isVisible,
        };
      }
      return img;
    });

    categoria.images = imagensAtualizadas;
    await categoria.save();

    res.status(200).json({ msg: "Imagem atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar imagem", error: error.message });
  }
};


// DELETE - Deletar categoria inteira
exports.categoryPlanDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await CategoryPlan.findById(id);

    if (!category) {
      return res.status(404).json({ msg: "Categoria não encontrada." });
    }

    if (category.logo && typeof category.logo === "string") {
      const logoPath = path.join("uploads/category", category.logo);
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }

    if (Array.isArray(category.images)) {
      for (const image of category.images) {
        if (image?.filename && typeof image.filename === "string") {
          const imagePath = path.join("uploads/category", image.filename);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      }
    }

    await CategoryPlan.deleteOne({ _id: id });

    res.status(200).json({ msg: "Categoria e arquivos deletados com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar categoria", error: error.message });
  }
};

// DELETE - Deletar imagem individual
exports.categoryPlanDeleteCard = async (req, res) => {
  const { idCategory, cardName } = req.params;

  try {
    const category = await CategoryPlan.findById(idCategory);
    if (!category) {
      return res.status(404).json({ msg: "Categoria não encontrada." });
    }

    const imagePath = path.join("uploads/category", cardName);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await CategoryPlan.updateOne(
      { _id: idCategory },
      { $pull: { images: { filename: cardName } } }
    );

    res.status(200).json({ msg: "Imagem removida com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao remover imagem", error: error.message });
  }
};

// PATCH - Alterar isVisible de uma imagem específica
exports.categoryVisibility = async (req, res) => {
  const { idCategoria, nomeImagem } = req.params;
  const { isVisible } = req.body;

  if (typeof isVisible !== 'boolean') {
    return res.status(400).json({ msg: "'isVisible' deve ser true ou false." });
  }

  try {
    const categoria = await CategoryPlan.findById(idCategoria);
    if (!categoria) {
      return res.status(404).json({ msg: "Categoria não encontrada." });
    }

    const imagemIndex = categoria.images.findIndex(img => img.filename === nomeImagem);
    if (imagemIndex === -1) {
      return res.status(404).json({ msg: "Imagem não encontrada na categoria." });
    }

    categoria.images[imagemIndex].isVisible = isVisible;
    await categoria.save();

    res.status(200).json({ msg: "Visibilidade da imagem atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar visibilidade da imagem", error: error.message });
  }
};
