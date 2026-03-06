const { Router } = require("express");
const membershipController = require("../controllers/membershipController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/", membershipController.membershipGet);
router.put("/", checkToken, membershipController.membershipPut);

module.exports = router;
