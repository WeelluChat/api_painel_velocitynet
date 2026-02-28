const { Router } = require("express");
const checkToken = require("../middleware/checktoken");
const RouterController = require("../controllers/routerController");

const router = Router();

router.get("/", RouterController.routerGet);
router.post("/create", checkToken, RouterController.routerCreate);
router.patch("/update", checkToken, RouterController.routerPatch);
router.delete("/delete", checkToken, RouterController.routerDelete);

module.exports = router;
