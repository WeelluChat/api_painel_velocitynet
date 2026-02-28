const { Router } = require("express");
const checkToken = require("../middleware/checktoken");
const { upload } = require("../middleware/upload");
const tvController = require("../controllers/tvController");

const router = Router();

router.get("/", tvController.tvGet);
router.post("/", checkToken, upload.single("image"), tvController.tvPost);
router.patch("/:id?", checkToken, upload.single("image"), tvController.tvPatch);
router.delete("/", checkToken, tvController.tvDelete);

module.exports = router;
