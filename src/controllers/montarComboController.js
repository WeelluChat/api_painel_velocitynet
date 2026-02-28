const Combo = require("../models/montarCombos");

exports.combosGet = async (req, res) => {
  try {
    const combos = await Combo.find();
    res.status(200).json(combos);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.combosPost = async (req, res) => {
  try {
    const { title, isVisible, planos } = req.body;
    const novoCombo = new Combo({ title, isVisible, planos: Array.isArray(planos) ? planos : [] });
    await novoCombo.save();
    res.status(201).json(novoCombo);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.combosPut = async (req, res) => {
  try {
    const comboAtualizado = await Combo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!comboAtualizado) {
      return res.status(404).json({ msg: "Combo não encontrado" });
    }
    res.status(200).json(comboAtualizado);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.combosDelete = async (req, res) => {
  try {
    const comboDeletado = await Combo.findByIdAndDelete(req.params.id);
    if (!comboDeletado) {
      return res.status(404).json({ msg: "Combo não encontrado" });
    }
    res.status(200).json({ msg: "Combo deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.atualizarPlanoViaBody = async (req, res) => {
  try {
    const { comboId, planoId, ...updateData } = req.body;
    const combo = await Combo.findById(comboId);
    if (!combo) return res.status(404).json({ msg: "Combo não encontrado" });

    const plano = combo.planos.id(planoId);
    if (!plano) return res.status(404).json({ msg: "Plano não encontrado" });

    Object.assign(plano, updateData);
    await combo.save();
    res.status(200).json(plano);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.atualizarBeneficioViaBody = async (req, res) => {
  try {
    const { comboId, planoId, beneficioId, ...updateData } = req.body;
    const combo = await Combo.findById(comboId);
    if (!combo) return res.status(404).json({ msg: "Combo não encontrado" });

    const plano = combo.planos.id(planoId);
    if (!plano) return res.status(404).json({ msg: "Plano não encontrado" });

    const beneficio = plano.beneficios.id(beneficioId);
    if (!beneficio) return res.status(404).json({ msg: "Benefício não encontrado" });

    Object.assign(beneficio, updateData);
    await combo.save();
    res.status(200).json(beneficio);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.atualizarDetalheViaBody = async (req, res) => {
  try {
    const { comboId, planoId, detalheId, ...updateData } = req.body;
    const combo = await Combo.findById(comboId);
    if (!combo) return res.status(404).json({ msg: "Combo não encontrado" });

    const plano = combo.planos.id(planoId);
    if (!plano) return res.status(404).json({ msg: "Plano não encontrado" });

    const detalhe = plano.detalhes.id(detalheId);
    if (!detalhe) return res.status(404).json({ msg: "Detalhe não encontrado" });

    Object.assign(detalhe, updateData);
    await combo.save();
    res.status(200).json(detalhe);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.atualizarImagemBeneficio = async (req, res) => {
  try {
    const { comboId, planoId, beneficioId, image } = req.body;

    if (!image) {
      return res.status(400).json({ msg: "Campo 'image' é obrigatório" });
    }

    const combo = await Combo.findById(comboId);
    if (!combo) return res.status(404).json({ msg: "Combo não encontrado" });

    const plano = combo.planos.id(planoId);
    if (!plano) return res.status(404).json({ msg: "Plano não encontrado" });

    const beneficio = plano.beneficios.id(beneficioId);
    if (!beneficio) return res.status(404).json({ msg: "Benefício não encontrado" });

    beneficio.image = image;
    await combo.save();

    res.status(200).json({ msg: "Imagem do benefício atualizada com sucesso", beneficio: beneficio.toObject() });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.adicionarPlanoAoCombo = async (req, res) => {
  try {
    const { comboId, novoPlano } = req.body;

    if (!comboId || !novoPlano) {
      return res.status(400).json({ msg: "comboId e novoPlano são obrigatórios" });
    }

    const combo = await Combo.findById(comboId);
    if (!combo) {
      return res.status(404).json({ msg: "Combo não encontrado" });
    }

    combo.planos.push(novoPlano);
    await combo.save();

    res.status(200).json({ msg: "Plano adicionado com sucesso", combo });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

