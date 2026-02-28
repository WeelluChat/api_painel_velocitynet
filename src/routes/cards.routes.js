const { Router } = require("express");
const cardsController = require("../controllers/cardsController");

const router = Router();

router.get("/", cardsController.cardsGet);
router.post("/", cardsController.cardsPost);
router.put("/:id", cardsController.cardsPut);
router.patch("/", cardsController.cardsPatch);
router.delete("/:id", cardsController.cardsDelete);

module.exports = router;
