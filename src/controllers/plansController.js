const Plan = require("../models/Plan");

exports.plansGet = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.plansCreate = async (req, res) => {
  const { nome, descricao, idCategoria, preco, complementar } = req.body;
  const arrayImages = (req.files || []).map((f) => f.filename);
  const jsonObject = JSON.parse(complementar.trim());

  const plans = new Plan({
    nome,
    imagem: arrayImages[0],
    planoBase: arrayImages[1],
    descricao,
    idCategoria,
    preco,
    complementar: jsonObject,
  });

  try {
    await plans.save();
    res.status(201).json({ msg: "Plano cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.plansDelete = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await Plan.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Plano não encontrado" });
    }
    res.status(200).json({ msg: "Plano deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.plansPatch = async (req, res) => {
  const { id, nome, descricao, preco, complementar, idCategoria } = req.body;
  const arrayImages = (req.files || []).map((f) => f.filename);

  const cleaned = preco
    ? preco.replace(/[\sR$]+/g, "").replace(/,/g, ".")
    : undefined;

  const jsonObject = complementar
    ? JSON.parse(complementar.trim())
    : undefined;

  const fields = { nome, descricao, idCategoria };
  if (cleaned !== undefined) fields.preco = cleaned;
  if (jsonObject !== undefined) fields.complementar = jsonObject;
  if (arrayImages[0]) fields.imagem = arrayImages[0];
  if (arrayImages[1]) fields.planoBase = arrayImages[1];

  // Remove undefined values so $set doesn't overwrite with undefined
  Object.keys(fields).forEach((k) => fields[k] === undefined && delete fields[k]);

  try {
    const result = await Plan.updateOne({ _id: id }, { $set: fields });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ msg: "Plano não encontrado" });
    }
    res.status(200).json({ msg: "Plano atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.plansPatchImagem = async (req, res) => {
  const { id } = req.body;
  const image = req.file?.filename;

  try {
    const result = await Plan.updateOne({ _id: id }, { imagem: image });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ msg: "Plano não encontrado" });
    }
    res.status(200).json({ msg: "Plano atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.plansPatchPlanBase = async (req, res) => {
  const { id } = req.body;
  const image = req.file?.filename;

  try {
    const result = await Plan.updateOne({ _id: id }, { planoBase: image });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ msg: "Plano não encontrado" });
    }
    res.status(200).json({ msg: "Plano atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
