const { Router } = require("express");
const sliderController = require("../controllers/sliderController");

const router = Router();

router.get("/", sliderController.sliderGet);
router.post("/", sliderController.sliderUpload, sliderController.sliderPost);
router.patch("/", sliderController.sliderUpload, sliderController.sliderPatch);
router.delete("/", sliderController.sliderDelete);
router.get("/view/:nomeDoArquivo", sliderController.verArquivo);

module.exports = router;
