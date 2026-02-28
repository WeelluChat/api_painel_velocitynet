const { Router } = require("express");
const MontarController = require("../controllers/montarComboController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/planos", MontarController.combosGet);
router.post("/criarPlanos", checkToken, MontarController.combosPost);
router.put("/atualizarPlanos/:id", checkToken, MontarController.combosPut);
router.delete("/deletarPlanos/:id", checkToken, MontarController.combosDelete);
router.put("/atualizarPlano", checkToken, MontarController.atualizarPlanoViaBody);
router.put("/atualizarBeneficio", checkToken, MontarController.atualizarBeneficioViaBody);
router.put("/atualizarDetalhe", checkToken, MontarController.atualizarDetalheViaBody);
router.put("/beneficioImage", checkToken, MontarController.atualizarImagemBeneficio);
router.patch("/adicionarPlano", checkToken, MontarController.adicionarPlanoAoCombo);

module.exports = router;
