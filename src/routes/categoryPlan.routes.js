const { Router } = require("express");
const categoryPlanController = require("../controllers/categoryPlanController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/", categoryPlanController.categoryPlanGet);
router.post("/create", checkToken, categoryPlanController.uploadCategoryFields, categoryPlanController.categoryPlanCreate);

router.patch("/patch/:id", checkToken, categoryPlanController.uploadLogoOnly, categoryPlanController.categoryPlanPatch);
router.patch("/create-card", checkToken, categoryPlanController.uploadImagesOnly, categoryPlanController.categoryPlanCreateCard);
router.patch(
  "/update-card/:idCategoria/:nomeAntigoImagem",
  checkToken,
  categoryPlanController.uploadImagemUnica,
  categoryPlanController.categoryPlanAtualizarImagemCard
);
router.patch("/reorder", checkToken, categoryPlanController.reorderCategories);
router.patch("/reorder-images/:id", checkToken, categoryPlanController.reorderCategoryImages);
router.patch("/visibility/:idCategoria/:nomeImagem", checkToken, categoryPlanController.categoryVisibility);

router.delete("/delete/:id", checkToken, categoryPlanController.categoryPlanDelete);
router.delete("/delete-card/:idCategory/:cardName", checkToken, categoryPlanController.categoryPlanDeleteCard);

module.exports = router;
