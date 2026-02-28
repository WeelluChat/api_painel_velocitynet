const { Router } = require("express");
const combosController = require("../controllers/combosController");

const router = Router();

router.get("/", combosController.combosImagesGet);
router.post("/", combosController.combosImagesPost);
router.delete("/:id", combosController.combosImagesDelete);

module.exports = router;
