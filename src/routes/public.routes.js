const { Router } = require("express");
const { getCombosByCityPublic, getCategoriesByCityPublic } = require("../controllers/publicController");

const router = Router();

router.get("/combos", getCombosByCityPublic);
router.get("/categories", getCategoriesByCityPublic);

module.exports = router;
