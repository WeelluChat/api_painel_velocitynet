const { Router } = require("express");
const CardsPlanos = require("../controllers/CardsController");

const router = Router();

router.get("/", CardsPlanos.CardsGet);
router.post("/", CardsPlanos.CardsPost);
router.put("/:id", CardsPlanos.CardsPut);
router.patch("/", CardsPlanos.CardsPatch);
router.delete("/:id", CardsPlanos.CardsDelete);

module.exports = router;
