const { Router } = require("express");
const checkToken = require("../middleware/checktoken");
const { upload } = require("../middleware/upload");
const ComplementController = require("../controllers/ComplementController");

const router = Router();

router.get("/", ComplementController.complementGet);
router.post("/get-id", ComplementController.complementGetByID);
router.post("/create", checkToken, upload.single("image"), ComplementController.complementCreate);
router.patch("/update", checkToken, upload.single("image"), ComplementController.complementPatch);
router.delete("/delete", checkToken, ComplementController.complementDelete);

module.exports = router;
