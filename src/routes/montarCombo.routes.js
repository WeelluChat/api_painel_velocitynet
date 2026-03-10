const { Router } = require("express");
const MontarController = require("../controllers/montarComboController");
const checkToken = require("../middleware/checktoken");

const router = Router();

// Legacy endpoint (used by public website – do not remove)
router.get("/planos", MontarController.combosGet);

// Relational endpoints for the panel
router.get("/combos", MontarController.getCombosLight);
router.get("/combos/:id", MontarController.getComboById);
router.get("/combos/:id/planos", MontarController.getPlanosByComboId);
router.get("/planos/:id", MontarController.getPlanoById);

router.post("/criarPlanos", checkToken, MontarController.combosPost);
router.put("/atualizarPlanos/:id", checkToken, MontarController.combosPut);
router.delete("/deletarPlanos/:id", checkToken, MontarController.combosDelete);
router.delete("/deletarPlano/:comboId/:planoId", checkToken, MontarController.deletarPlano);
router.put("/atualizarPlano", checkToken, MontarController.atualizarPlanoViaBody);
router.put("/atualizarBeneficio", checkToken, MontarController.atualizarBeneficioViaBody);
router.put("/atualizarDetalhe", checkToken, MontarController.atualizarDetalheViaBody);
router.put("/beneficioImage", checkToken, MontarController.atualizarImagemBeneficio);
router.patch("/combos/reorder", checkToken, MontarController.reorderCombos);
router.patch("/combos/:comboId/planos/reorder", checkToken, MontarController.reorderPlanos);
router.patch("/adicionarPlano", checkToken, MontarController.adicionarPlanoAoCombo);

module.exports = router;
