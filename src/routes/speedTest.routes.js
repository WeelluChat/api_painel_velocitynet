const { Router } = require("express");
const speedTestController = require("../controllers/speedTestController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/", speedTestController.speedTestGet);
router.post("/", checkToken, speedTestController.speedTestUpload, speedTestController.speedTestPost);
router.patch("/", checkToken, speedTestController.speedTestUpload, speedTestController.speedTestPatch);
router.delete("/", checkToken, speedTestController.speedTestDelete);
router.get("/view/:nomeDoArquivo", speedTestController.verArquivo);

module.exports = router;
