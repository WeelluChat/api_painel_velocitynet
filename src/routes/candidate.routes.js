const { Router } = require("express");
const { upload } = require("../middleware/upload");
const candidateController = require("../controllers/candidateController");

const router = Router();

router.get("/get", candidateController.candidateGet);
router.post("/post", upload.single("image"), candidateController.candidatePost);
router.post("/delete", candidateController.candidateDelete);

module.exports = router;
