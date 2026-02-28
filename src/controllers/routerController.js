const Router = require("../models/Router");

exports.routerGet = async (req, res) => {
  const { idCategory } = req.body;
  try {
    const router = await Router.find({ idCategory });
    res.status(200).json(router);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.routerCreate = async (req, res) => {
  const { preco } = req.body;
  try {
    const router = new Router({ preco });
    await router.save();
    res.status(201).json({ msg: "Roteador cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.routerDelete = async (req, res) => {
  const { id } = req.body;
  try {
    await Router.deleteOne({ _id: id });
    res.status(200).json({ msg: "Roteador deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.routerPatch = async (req, res) => {
  const { id, preco } = req.body;
  try {
    await Router.updateOne({ _id: id }, { $set: { preco } });
    res.status(200).json({ msg: "Roteador atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
