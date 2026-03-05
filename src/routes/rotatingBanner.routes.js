const { Router } = require("express");
const rotatingBannerController = require("../controllers/rotatingBannerController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/", rotatingBannerController.rotatingBannerGet);
router.put("/", checkToken, rotatingBannerController.rotatingBannerPut);

module.exports = router;
