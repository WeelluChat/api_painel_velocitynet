const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Slider = require("../models/Slider");

// Configuração do multer diretamente no controller
const uploadPath = path.join(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage, limits: { fileSize: 200 * 1024 * 1024 } });

exports.sliderUpload = upload.fields([
  { name: "desktop", maxCount: 1 },
  { name: "mobile", maxCount: 1 },
]);

// GET sliders válidos a partir da data atual
exports.sliderGet = async (req, res) => {
  try {
    const currentDate = new Date().toLocaleDateString("pt-BR");

    const slider = await Slider.find({
      $or: [
        { "desktop.dateSlider": { $gte: currentDate } },
        { "mobile.dateSlider": { $gte: currentDate } },
      ],
    });

    if (slider.length === 0) {
      res.status(204).json({ msg: "Lista vazia" });
    } else {
      res.status(200).json(slider);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.sliderGetAll = async (req, res) => {
  try {
    const slider = await Slider.find({});

    if (slider.length === 0) {
      res.status(204).json({ msg: "Lista vazia" });
    } else {
      res.status(200).json(slider);
    }
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

// POST novo slider (espera 2 arquivos: desktop e mobile)
exports.sliderPost = async (req, res) => {
  try {
    const desktop = req.files?.desktop?.[0];
    const mobile = req.files?.mobile?.[0];

    if (!desktop || !mobile) {
      return res.status(422).json({ msg: "Arquivos inválidos ou ausentes" });
    }

    const currentDate = new Date().toLocaleDateString("pt-BR");

    const slider = new Slider({
      desktop: {
        name: desktop.filename,
        dateSlider: currentDate,
      },
      mobile: {
        name: mobile.filename,
        dateSlider: currentDate,
      },
    });

    await slider.save();
    res.status(200).json({ msg: "Slider salvo com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar slider:", error);
    res.status(500).json({
      msg: "Erro ao salvar slider",
      error: error.message || error.toString(),
    });
  }
};

// PATCH atualização
exports.sliderPatch = async (req, res) => {
  const { id, dateDesktop, dateMobile } = req.body;

  try {
    const updateFields = {};

    if (req.files?.desktop?.[0]) {
      updateFields["desktop.name"] = req.files.desktop[0].filename;
    }
    if (req.files?.mobile?.[0]) {
      updateFields["mobile.name"] = req.files.mobile[0].filename;
    }

    if (dateDesktop) updateFields["desktop.dateSlider"] = dateDesktop;
    if (dateMobile) updateFields["mobile.dateSlider"] = dateMobile;

    await Slider.updateOne({ _id: id }, { $set: updateFields });
    res.status(200).json({ msg: "Slider atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar slider" });
  }
};

// DELETE slider
exports.sliderDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await Slider.deleteOne({ _id: id });
    res.status(200).json({ msg: "Slider deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar slider" });
  }
};

// Ver imagem
exports.verArquivo = async (req, res) => {
  const nomeDoArquivo = req.params.nomeDoArquivo;
  const caminhoDoArquivo = path.join(uploadPath, nomeDoArquivo);

  fs.access(caminhoDoArquivo, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Imagem não encontrada");
    }

    res.sendFile(caminhoDoArquivo);
  });
};
