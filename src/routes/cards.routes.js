const { Router } = require("express");
const cardsController = require("../controllers/cardsController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/", cardsController.cardsGet);
router.post("/", checkToken, cardsController.cardsPost);
router.put("/:id", checkToken, cardsController.cardsPut);
router.patch("/", checkToken, cardsController.cardsPatch);
router.delete("/:id", checkToken, cardsController.cardsDelete);

module.exports = router;
