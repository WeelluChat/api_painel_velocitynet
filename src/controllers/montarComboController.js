const Combo = require("../models/montarCombos");
const Plano = require("../models/montarPlanos");

exports.combosGet = async (req, res) => {
  try {
    const combos = await Combo.find().populate("planos");
    res.status(200).json(combos);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.combosPost = async (req, res) => {
  try {
    const { title, isVisible } = req.body;
    const novoCombo = new Combo({ title, isVisible });
    await novoCombo.save();
    res.status(201).json(novoCombo);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.combosPut = async (req, res) => {
  try {
    // Prevent overwriting plan references with raw data
    const { planos, ...safeData } = req.body;
    const comboAtualizado = await Combo.findByIdAndUpdate(
      req.params.id,
      { $set: safeData },
      { new: true, runValidators: true }
    ).populate("planos");
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
    const combo = await Combo.findById(req.params.id);
    if (!combo) {
      return res.status(404).json({ msg: "Combo não encontrado" });
    }
    // Delete all plans belonging to this combo
    await Plano.deleteMany({ _id: { $in: combo.planos } });
    await Combo.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Combo deletado com sucesso" });
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

    // Save the plan as its own document in the Plano collection
    const plano = new Plano({ ...novoPlano, idCombo: comboId });
    await plano.save();

    combo.planos.push(plano._id);
    await combo.save();

    res.status(200).json({ msg: "Plano adicionado com sucesso", plano });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.deletarPlano = async (req, res) => {
  try {
    const { comboId, planoId } = req.params;

    const combo = await Combo.findById(comboId);
    if (!combo) return res.status(404).json({ msg: "Combo não encontrado" });

    await Plano.findByIdAndDelete(planoId);
    combo.planos = combo.planos.filter((id) => id.toString() !== planoId);
    await combo.save();

    res.status(200).json({ msg: "Plano deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.atualizarPlanoViaBody = async (req, res) => {
  try {
    const { planoId, ...updateData } = req.body;
    delete updateData.comboId;

    const plano = await Plano.findByIdAndUpdate(
      planoId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!plano) return res.status(404).json({ msg: "Plano não encontrado" });

    res.status(200).json(plano);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.atualizarBeneficioViaBody = async (req, res) => {
  try {
    const { planoId, beneficioId, ...updateData } = req.body;
    delete updateData.comboId;

    const plano = await Plano.findById(planoId);
    if (!plano) return res.status(404).json({ msg: "Plano não encontrado" });

    const beneficio = plano.beneficios.id(beneficioId);
    if (!beneficio) return res.status(404).json({ msg: "Benefício não encontrado" });

    Object.assign(beneficio, updateData);
    await plano.save();
    res.status(200).json(beneficio);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.atualizarDetalheViaBody = async (req, res) => {
  try {
    const { planoId, detalheId, ...updateData } = req.body;
    delete updateData.comboId;

    const plano = await Plano.findById(planoId);
    if (!plano) return res.status(404).json({ msg: "Plano não encontrado" });

    const detalhe = plano.detalhes.id(detalheId);
    if (!detalhe) return res.status(404).json({ msg: "Detalhe não encontrado" });

    Object.assign(detalhe, updateData);
    await plano.save();
    res.status(200).json(detalhe);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.atualizarImagemBeneficio = async (req, res) => {
  try {
    const { planoId, beneficioId, image } = req.body;

    if (!image) {
      return res.status(400).json({ msg: "Campo 'image' é obrigatório" });
    }

    const plano = await Plano.findById(planoId);
    if (!plano) return res.status(404).json({ msg: "Plano não encontrado" });

    const beneficio = plano.beneficios.id(beneficioId);
    if (!beneficio) return res.status(404).json({ msg: "Benefício não encontrado" });

    beneficio.image = image;
    await plano.save();

    res.status(200).json({ msg: "Imagem do benefício atualizada com sucesso", beneficio: beneficio.toObject() });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

