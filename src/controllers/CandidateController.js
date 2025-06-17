//servidor
const CandidateModel = require("../models/Candidate");

exports.candidateGet = async (req, res) => {
  const candidate = await CandidateModel.find();

  try {
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.CandidatePost = async (req, res) => {
  const { nome, dataNascimento, email, telefone, funcaoEsc, conteSobre_voce } = req.body;
  const image = req.file ? req.file.filename : null;
  console.log(req.body);

  const candidate = new CandidateModel({
    nome: nome,
    telefone: telefone,
    email: email,
    dataNascimento: dataNascimento,
    funcaoEsc: funcaoEsc,
    anexo: image,
    conteSobreVoce: conteSobre_voce,
    dataEnvio: Date.now(),
  });

  try {
    await candidate.save();
    res.status(200).json({ msg: "Candidato salvo com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
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

    res.status(200).json({ msg: "Candidato deletado com sucesso (via POST)" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor ao deletar candidato" });
  }
};


// exports.tvPatch = async (req, res) => {
//   const { id, title, description, value } = req.body;
//   const image = req.file ? req.file.originalname : null;

//   const id_param = req.params.id;

//   const updateFields = {};

//   if (title !== undefined) {
//     updateFields.title = title;
//   }

//   if (description !== undefined) {
//     updateFields.description = description;
//   }

//   if (value !== undefined) {
//     updateFields.value = value;
//   }

//   if (image !== null) {
//     updateFields.image = image;
//   }

//   try {
//     if (id_param != undefined) {
//       await Tv.updateOne({ _id: id_param }, { $set: updateFields });
//       res.status(200).json({ msg: "Tv atualizada com sucesso" });
//     } else {
//       await Tv.updateOne({ _id: id }, { $set: updateFields });
//       res.status(200).json({ msg: "Tv atualizada com sucesso" });
//     }
//   } catch (error) {
//     res.status(500).json({ msg: "Erro no servidor" });
//   }
// };

// exports.tvDelete = async (req, res) => {
//   const { id } = req.body;

//   try {
//     await Tv.deleteOne({ _id: id });
//     res.status(200).json({ msg: "Tv deletada com sucesso" });
//   } catch (error) {
//     res.status(500).json({ msg: "Error no servidor " });
//   }
// };
