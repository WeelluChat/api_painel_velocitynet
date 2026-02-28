const CandidateModel = require("../models/Candidate");

exports.candidateGet = async (req, res) => {
  try {
    const candidates = await CandidateModel.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.candidatePost = async (req, res) => {
  const { nome, dataNascimento, email, telefone, funcaoEsc, conteSobre_voce } = req.body;
  const image = req.file ? req.file.filename : null;

  const candidate = new CandidateModel({
    nome,
    telefone,
    email,
    dataNascimento,
    funcaoEsc,
    anexo: image,
    conteSobreVoce: conteSobre_voce,
    dataEnvio: Date.now(),
  });

  try {
    await candidate.save();
    res.status(201).json({ msg: "Candidato salvo com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.candidateDelete = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ msg: "ID obrigatório para deletar" });
  }

  try {
    const deleted = await CandidateModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ msg: "Candidato não encontrado" });
    }

    res.status(200).json({ msg: "Candidato deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
