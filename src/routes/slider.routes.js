const { Router } = require("express");
const sliderController = require("../controllers/sliderController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/", sliderController.sliderGet);
router.post("/", checkToken, sliderController.sliderUpload, sliderController.sliderPost);
router.patch("/", checkToken, sliderController.sliderUpload, sliderController.sliderPatch);
router.delete("/", checkToken, sliderController.sliderDelete);
router.get("/view/:nomeDoArquivo", sliderController.verArquivo);

module.exports = router;
