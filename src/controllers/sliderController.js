const fs = require("fs");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const Slider = require("../models/Slider");

// Caminho para salvar imagens
const uploadPath = path.join(__dirname, "..", "..", "uploads");

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
});

exports.sliderUpload = upload.fields([
  { name: "desktop", maxCount: 1 },
  { name: "mobile", maxCount: 1 },
]);

// GET todos os sliders
exports.sliderGet = async (req, res) => {
  try {
    const sliders = await Slider.find({});
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar sliders", error });
  }
};

// POST - criar novo slider
exports.sliderPost = async (req, res) => {
  try {
    const desktop = req.files?.desktop?.[0];
    const mobile = req.files?.mobile?.[0];

    if (!desktop || !mobile) {
      return res.status(422).json({ msg: "Arquivos inválidos ou ausentes" });
    }

    const slider = new Slider({
      desktop: {
        name: desktop.filename,
      },
      mobile: {
        name: mobile.filename,
      },
    });

    await slider.save();
    res.status(200).json({ msg: "Slider salvo com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao salvar slider", error: error.message });
  }
};

// PATCH - atualizar slider
exports.sliderPatch = async (req, res) => {
  const { id } = req.body;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const updateFields = {};

    if (req.files?.desktop?.[0]) {
      updateFields["desktop.name"] = req.files.desktop[0].filename;
    }

    if (req.files?.mobile?.[0]) {
      updateFields["mobile.name"] = req.files.mobile[0].filename;
    }

    await Slider.updateOne({ _id: id }, { $set: updateFields });
    res.status(200).json({ msg: "Slider atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar slider", error: error.message });
  }
};

// DELETE - remover slider + arquivos
exports.sliderDelete = async (req, res) => {
  const { id } = req.body;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const slider = await Slider.findById(id);
    if (!slider) {
      return res.status(404).json({ msg: "Slider não encontrado" });
    }

    // Remove os arquivos associados
    const arquivos = [slider.desktop?.name, slider.mobile?.name];

    for (const nome of arquivos) {
      if (nome) {
        const caminho = path.join(uploadPath, nome);
        try {
          await fs.promises.access(caminho, fs.constants.F_OK);
          await fs.promises.unlink(caminho);
        } catch (err) {
          console.warn(`Erro ao excluir arquivo: ${nome}`, err.message);
        }
      }
    }

    // Remove do banco
    await Slider.deleteOne({ _id: id });

    res.status(200).json({ msg: "Slider deletado com sucesso" });
  } catch (error) {
    console.error("Erro no delete:", error);
    res.status(500).json({ msg: "Erro ao deletar slider", error: error.message });
  }
};


// GET - ver imagem
exports.verArquivo = async (req, res) => {
  try {
    const nomeDoArquivo = req.params.nomeDoArquivo;
    const caminhoDoArquivo = path.join(uploadPath, nomeDoArquivo);

    await fs.promises.access(caminhoDoArquivo, fs.constants.F_OK);
    res.sendFile(caminhoDoArquivo);
  } catch {
    res.status(404).send("Imagem não encontrada");
  }
};
