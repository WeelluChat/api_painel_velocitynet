const { Router } = require("express");
const MontarController = require("../controllers/montarComboController");

const router = Router();

router.get("/planos", MontarController.combosGet);
router.post("/criarPlanos", MontarController.combosPost);
router.put("/atualizarPlanos/:id", MontarController.combosPut);
router.delete("/deletarPlanos/:id", MontarController.combosDelete);
router.put("/atualizarPlano", MontarController.atualizarPlanoViaBody);
router.put("/atualizarBeneficio", MontarController.atualizarBeneficioViaBody);
router.put("/atualizarDetalhe", MontarController.atualizarDetalheViaBody);
router.put("/beneficioImage", MontarController.atualizarImagemBeneficio);
router.patch("/adicionarPlano", MontarController.adicionarPlanoAoCombo);

module.exports = router;
