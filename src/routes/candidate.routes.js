const { Router } = require("express");
const { upload } = require("../middleware/upload");
const candidateController = require("../controllers/candidateController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/get", checkToken, candidateController.candidateGet);
router.post("/post", upload.single("image"), candidateController.candidatePost);
router.post("/delete", checkToken, candidateController.candidateDelete);

module.exports = router;
