const { Router } = require("express");
const checkToken = require("../middleware/checktoken");
const {
  getCities,
  createCity,
  updateCity,
  deleteCity,
} = require("../controllers/citiesController");

const router = Router();

router.get("/", getCities);
router.post("/", checkToken, createCity);
router.put("/:id", checkToken, updateCity);
router.delete("/:id", checkToken, deleteCity);

module.exports = router;
