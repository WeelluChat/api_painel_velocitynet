const fs = require("fs");
const path = require("path");
const Slider = require("../models/Slider");

exports.sliderGet = async (req, res) => {
  try {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toLocaleDateString("pt-BR");

    const slider = await Slider.find({
      dateSlider: {
        $gte: formattedCurrentDate,
      },
    });

    if (slider == "") {
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

    if (slider == "") {
      res.status(204).json({ msg: "Lista vazia" });
    } else {
      res.status(200).json(slider);
    }
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor" });
  }
};

exports.sliderPost = async (req, res) => {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString("pt-BR");
  const file = req.file;
  const image = req.file.filename;

  const slider = new Slider({
    name: image,
    dateSlider: formattedCurrentDate,
  });

  if (!file) {
    res.status(422).json({ msg: "Imagem inválida" });
  }

  try {
    await slider.save();
    res.status(200).json({ msg: "Imagem salva" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.sliderPatch = async (req, res) => {
  const name = req.file ? req.file.originalname : null;
  const { id, date } = req.body;

  const updateFields = { dateSlider: date };

  if (name !== null) {
    updateFields.name = name;
  }

  try {
    await Slider.updateOne({ _id: id }, { $set: updateFields });
    res.status(200).json({
      msg: "Imagem alterada com sucesso",
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.sliderDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await Slider.deleteOne({ _id: id });
    res.status(200).json({ msg: "Image deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.verArquivo = async (req, res) => {
  const pastaUploads = path.join(__dirname, "..", "..", "uploads");
  const nomeDoArquivo = req.params.nomeDoArquivo;

  const caminhoDoArquivo = path.join(pastaUploads, nomeDoArquivo);

  fs.access(caminhoDoArquivo, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Imagem não encontrada");
    }

    res.sendFile(caminhoDoArquivo);
  });
};
