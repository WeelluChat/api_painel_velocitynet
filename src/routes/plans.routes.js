const { Router } = require("express");
const checkToken = require("../middleware/checktoken");
const { uploadArray } = require("../middleware/upload");
const plansController = require("../controllers/plansController");

const router = Router();

router.get("/", plansController.plansGet);
router.post("/create", checkToken, uploadArray.array("images"), plansController.plansCreate);
router.patch("/update", uploadArray.array("images"), checkToken, plansController.plansPatch);
router.delete("/delete", checkToken, plansController.plansDelete);

module.exports = router;
