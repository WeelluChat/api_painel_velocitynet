const combosImages = require("../models/combos");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.combosImagesGet = async (req, res) => {
  try {
    const images = await combosImages.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.combosImagesPost = [
  upload.single("image"),
  async (req, res) => {
    try {
      const novaImagem = new combosImages({ image: req.file.path });
      await novaImagem.save();
      res.status(201).json(novaImagem);
    } catch (error) {
      res.status(500).json({ msg: "Erro no servidor" });
    }
  },
];

exports.combosImagesDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const imagem = await combosImages.findById(id);

    if (!imagem) {
      return res.status(404).json({ msg: "Imagem não encontrada" });
    }

    const filePath = path.join(__dirname, "..", imagem.image);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Erro ao deletar arquivo", err);
    });

    await combosImages.findByIdAndDelete(id);
    res.status(200).json({ msg: "Imagem deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};