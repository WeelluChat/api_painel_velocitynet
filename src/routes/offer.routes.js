const { Router } = require("express");
const checkToken = require("../middleware/checktoken");
const { upload } = require("../middleware/upload");
const offerController = require("../controllers/offerController");

const router = Router();

router.get("/", offerController.offerGet);
router.post("/", checkToken, upload.single("image"), offerController.offerPost);
router.patch("/:id?", checkToken, upload.single("image"), offerController.offerPatch);
router.delete("/", checkToken, offerController.offerDelete);

module.exports = router;
