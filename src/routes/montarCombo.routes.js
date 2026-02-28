const { Router } = require("express");
const MontarController = require("../controllers/montarComboController");

const router = Router();

router.get("/planos", MontarController.CombosGet);
router.post("/criarPlanos", MontarController.CombosPost);
router.put("/atualizarPlanos/:id", MontarController.CombosPut);
router.delete("/deletarPlanos/:id", MontarController.CombosDelete);
router.put("/atualizarPlano", MontarController.AtualizarPlanoViaBody);
router.put("/atualizarBeneficio", MontarController.AtualizarBeneficioViaBody);
router.put("/atualizarDetalhe", MontarController.AtualizarDetalheViaBody);
router.put("/beneficioImage", MontarController.AtualizarImagemBeneficio);
router.patch("/adicionarPlano", MontarController.AdicionarPlanoAoCombo);

module.exports = router;
