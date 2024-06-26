const Additional = require("../models/Additional");

exports.additionalGet = async (req, res) => {
  const additional = await Additional.find({});
  try {
    res.status(200).json(additional);
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.additionalCreate = async (req, res) => {
  const { name, preco, idPlan } = req.body;
  const file = req.file.filename;

  // const jsonString = "";
  // const jsonObject = "";
  // if (idPlans != undefined) {
  //   jsonString = idPlans;

  //   jsonString = jsonString.trim();

  //   jsonObject = JSON.parse(jsonString);
  // }

  const additional = new Additional({
    nome: name,
    image: file,
    preco: preco,
    idPlan: idPlan,
  });

  try {
    await additional.save();
    res.status(200).json({ msg: "Benefício cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.additionalDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await Additional.deleteOne({ _id: id });
    res.status(200).json({ msg: "Benefício deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Error no servidor " });
  }
};

exports.additionalPatch = async (req, res) => {
  const { id, nome, preco, status } = req.body;

  const fileds = {};

  const newPrice = preco.replace(/[\sR\$]+/g, "");

  const cleaned = newPrice.replace(/,/g, ".");

  if (!req.file) {
    fileds.image = undefined;
  } else {
    fileds.image = req.file.filename;
  }

  fileds.nome = nome ?? undefined;
  fileds.preco = cleaned ?? undefined;
  fileds.status = status ?? undefined;

  try {
    await Additional.updateOne({ _id: id }, { $set: fileds });
    res.status(200).json({
      msg: "Benefício alterada com sucesso",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
