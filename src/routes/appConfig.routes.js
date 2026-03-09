const { Router } = require("express");
const checkToken = require("../middleware/checktoken");
const { getConfig, patchConfig } = require("../controllers/appConfigController");

const router = Router();

router.get("/", getConfig);
router.patch("/", checkToken, patchConfig);

module.exports = router;
