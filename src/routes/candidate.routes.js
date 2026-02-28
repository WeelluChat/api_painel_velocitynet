const { Router } = require("express");
const { upload } = require("../middleware/upload");
const CandidateController = require("../controllers/CandidateController");

const router = Router();

router.get("/get", CandidateController.candidateGet);
router.post("/post", upload.single("image"), CandidateController.CandidatePost);
router.post("/delete", CandidateController.candidateDelete);

module.exports = router;
