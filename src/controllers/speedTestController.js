const fs = require("fs");
const path = require("path");
const multer = require("multer");
const SpeedTest = require("../models/SpeedTest");

const uploadPath = path.join(__dirname, "..", "..", "uploads");

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

exports.speedTestUpload = upload.fields([{ name: "image", maxCount: 1 }]);

// GET - retorna o documento único
exports.speedTestGet = async (req, res) => {
  try {
    const speedTest = await SpeedTest.findOne({});
    res.status(200).json(speedTest);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar SpeedTest", error });
  }
};

// POST - cria o documento (apenas um permitido)
exports.speedTestPost = async (req, res) => {
  try {
    const existing = await SpeedTest.findOne({});
    if (existing) {
      return res.status(409).json({ msg: "SpeedTest já existe. Use PATCH para atualizar." });
    }

    const image = req.files?.image?.[0];
    const { redirectUrl } = req.body;

    if (!image) {
      return res.status(422).json({ msg: "Imagem ausente ou inválida" });
    }

    const speedTest = new SpeedTest({
      image: { name: image.filename },
      redirectUrl,
      enabled: true,
    });

    await speedTest.save();
    res.status(200).json({ msg: "SpeedTest salvo com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao salvar SpeedTest", error: error.message });
  }
};

// PATCH - atualiza o documento único
exports.speedTestPatch = async (req, res) => {
  try {
    const speedTest = await SpeedTest.findOne({});
    if (!speedTest) {
      return res.status(404).json({ msg: "SpeedTest não encontrado" });
    }

    const updateFields = {};

    if (req.files?.image?.[0]) {
      const oldImage = speedTest.image?.name;
      if (oldImage) {
        const oldPath = path.join(uploadPath, oldImage);
        try { await fs.promises.unlink(oldPath); } catch (err) { console.warn(`Erro ao excluir imagem antiga: ${oldImage}`, err.message); }
      }
      updateFields["image.name"] = req.files.image[0].filename;
    }

    if (req.body.redirectUrl !== undefined) {
      updateFields["redirectUrl"] = req.body.redirectUrl;
    }

    if (req.body.enabled !== undefined) {
      updateFields["enabled"] = req.body.enabled !== 'false' && req.body.enabled !== false;
    }

    await SpeedTest.updateOne({ _id: speedTest._id }, { $set: updateFields });
    res.status(200).json({ msg: "SpeedTest atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar SpeedTest", error: error.message });
  }
};

// DELETE - remove o documento e a imagem associada
exports.speedTestDelete = async (req, res) => {
  try {
    const speedTest = await SpeedTest.findOne({});
    if (!speedTest) {
      return res.status(404).json({ msg: "SpeedTest não encontrado" });
    }

    const imageName = speedTest.image?.name;
    if (imageName) {
      const caminho = path.join(uploadPath, imageName);
      try {
        await fs.promises.access(caminho, fs.constants.F_OK);
        await fs.promises.unlink(caminho);
      } catch (err) {
        console.warn(`Erro ao excluir arquivo: ${imageName}`, err.message);
      }
    }

    await SpeedTest.deleteOne({ _id: speedTest._id });
    res.status(200).json({ msg: "SpeedTest deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar SpeedTest", error: error.message });
  }
};

// GET - visualizar imagem
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
