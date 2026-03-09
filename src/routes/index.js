const { Router } = require("express");

const router = Router();

router.use("/", require("./auth.routes"));
router.use("/", require("../controllers/emailControllers"));
router.use("/", require("./card.routes"));
router.use("/", require("./montarCombo.routes"));
router.use("/", require("./perguntas.routes"));
router.use("/additional", require("./additional.routes"));
router.use("/cards", require("./cards.routes"));
router.use("/category-plan", require("./categoryPlan.routes"));
router.use("/slider", require("./slider.routes"));
router.use("/tv", require("./tv.routes"));
router.use("/speed-test", require("./speedTest.routes"));
router.use("/rotating-banner", require("./rotatingBanner.routes"));
router.use("/membership", require("./membership.routes"));
router.use("/cities", require("./cities.routes"));
router.use("/app-config", require("./appConfig.routes"));


module.exports = router;
