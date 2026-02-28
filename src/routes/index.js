const { Router } = require("express");

const router = Router();

router.use("/combos", require("./combos.routes"));
router.use("/slider", require("./slider.routes"));
router.use("/", require("./auth.routes"));
router.use("/", require("./card.routes"));
router.use("/offer", require("./offer.routes"));
router.use("/tv", require("./tv.routes"));
router.use("/plans", require("./plans.routes"));
router.use("/additional", require("./additional.routes"));
router.use("/category-plan", require("./categoryPlan.routes"));
router.use("/router", require("./router.routes"));
router.use("/complement", require("./complement.routes"));
router.use("/candidate", require("./candidate.routes"));
router.use("/", require("./montarCombo.routes"));
router.use("/", require("./perguntas.routes"));
router.use("/cards", require("./cards.routes"));
router.use("/", require("../controllers/emailControllers"));

module.exports = router;
