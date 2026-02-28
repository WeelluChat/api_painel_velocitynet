const { Router } = require("express");
const checkToken = require("../middleware/checktoken");
const { upload } = require("../middleware/upload");
const complementController = require("../controllers/complementController");

const router = Router();

router.get("/", complementController.complementGet);
router.post("/get-id", complementController.complementGetByID);
router.post("/create", checkToken, upload.single("image"), complementController.complementCreate);
router.patch("/update", checkToken, upload.single("image"), complementController.complementPatch);
router.delete("/delete", checkToken, complementController.complementDelete);

module.exports = router;
