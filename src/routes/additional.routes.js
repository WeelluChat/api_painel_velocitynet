const { Router } = require("express");
const additionalController = require("../controllers/additionalController");

const router = Router();

router.get("/", additionalController.additionalGet);
router.post("/create", additionalController.additionalPost);
router.patch("/update", additionalController.additionalPatch);
router.delete("/delete/:id", additionalController.additionalDelete);

module.exports = router;
