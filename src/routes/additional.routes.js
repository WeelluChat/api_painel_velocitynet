const { Router } = require("express");
const additionalController = require("../controllers/additionalController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/", additionalController.additionalGet);
router.post("/create", checkToken, additionalController.additionalPost);
router.patch("/update", checkToken, additionalController.additionalPatch);
router.delete("/delete/:id", checkToken, additionalController.additionalDelete);

module.exports = router;
