const { Router } = require("express");
const checkToken = require("../middleware/checktoken");
const descriptionController = require("../controllers/descriptionController");

const router = Router();

router.get("/card-title", descriptionController.cardTitleSectionGet);
router.post("/card-title", checkToken, descriptionController.cardTitleSectionPost);
router.patch("/card-title", checkToken, descriptionController.cardTitleSectionPatch);

router.get("/card", descriptionController.cardGet);
router.post("/card", checkToken, descriptionController.cardPost);
router.patch("/card", checkToken, descriptionController.cardPatch);
router.delete("/card/:id", checkToken, descriptionController.cardDelete);

module.exports = router;
