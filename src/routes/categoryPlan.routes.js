const { Router } = require("express");
const categoryPlanController = require("../controllers/categoryPlanController");

const router = Router();

router.get("/", categoryPlanController.categoryPlanGet);
router.post("/create", categoryPlanController.uploadCategoryFields, categoryPlanController.categoryPlanCreate);

router.patch("/patch/:id", categoryPlanController.uploadLogoOnly, categoryPlanController.categoryPlanPatch);
router.patch("/create-card", categoryPlanController.uploadImagesOnly, categoryPlanController.categoryPlanCreateCard);
router.patch(
  "/update-card/:idCategoria/:nomeAntigoImagem",
  categoryPlanController.uploadImagemUnica,
  categoryPlanController.categoryPlanAtualizarImagemCard
);
router.patch("/visibility/:idCategoria/:nomeImagem", categoryPlanController.categoryVisibility);

router.delete("/delete/:id", categoryPlanController.categoryPlanDelete);
router.delete("/delete-card/:idCategory/:cardName", categoryPlanController.categoryPlanDeleteCard);

module.exports = router;
