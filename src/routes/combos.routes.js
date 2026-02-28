const { Router } = require("express");
const combosController = require("../controllers/combosController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/", combosController.combosImagesGet);
router.post("/", checkToken, combosController.combosImagesPost);
router.delete("/:id", checkToken, combosController.combosImagesDelete);

module.exports = router;
