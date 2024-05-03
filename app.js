require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const multer = require("multer");

const storage = require("./src/middleware/storage");

const upload = multer({ storage });

const cors = require("cors");

const checkToken = require("./src/middleware/checktoken");
const sliderController = require("./src/controllers/sliderController");
const loginController = require("./src/controllers/loginController");
const descriptionController = require("./src/controllers/descriptionController");
const offerController = require("./src/controllers/offerController");
const tvController = require("./src/controllers/tvController");
const categoryController = require("./src/controllers/categoryController");
const plansController = require("./src/controllers/plansController");
const additionalController = require("./src/controllers/additionalController");
const categoryPlanController = require("./src/controllers/categoryPlanController");

app.use(express.json());
app.use(cors());

app.get("/api/v1/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa api!" });
});

app.get("/api/v1/uploads/:nomeDoArquivo", sliderController.verArquivo);

///////////////////////////////////////////////// SLIDER ///////////////////////////////////////////////////////////
app.get("/api/v1/slider", sliderController.sliderGet);
app.get("/api/v1/slider-all", sliderController.sliderGetAll);
app.post(
  "/api/v1/slider",
  checkToken,
  upload.single("image"),
  sliderController.sliderPost
);
app.delete("/api/v1/slider", checkToken, sliderController.sliderDelete);
app.patch(
  "/api/v1/slider",
  checkToken,
  upload.single("image"),
  sliderController.sliderPatch
);
///////////////////////////////////////////////// SLIDER ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// PLANOS ///////////////////////////////////////////////////////////
app.get("/api/v1/plans", categoryController.categoryGet);
app.post(
  "/api/v1/plans",
  checkToken,
  upload.single("image"),
  categoryController.categoryPost
);
app.patch(
  "/api/v1/plans",
  checkToken,
  upload.single("image"),
  categoryController.categoryPatch
);
app.delete("/api/v1/plans", checkToken, categoryController.categoryDelete);
///////////////////////////////////////////////// PLANOS ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// LOGIN ///////////////////////////////////////////////////////////
app.post("/api/v1/login", loginController.login);
app.post("/api/v1/auth/login", loginController.authLogin);
app.post("/api/v1/auth/register", loginController.authRegister);
///////////////////////////////////////////////// LOGIN ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// CARD ///////////////////////////////////////////////////////////
app.get("/api/v1/card-title", descriptionController.cardTitleSectionGet);
app.post(
  "/api/v1/card-title",
  checkToken,
  descriptionController.cardTitleSectionPost
);
app.patch(
  "/api/v1/card-title",
  checkToken,
  descriptionController.cardTitleSectionPatch
);

app.get("/api/v1/card", descriptionController.cardGet);
app.post("/api/v1/card", checkToken, descriptionController.cardPost);
app.patch("/api/v1/card", checkToken, descriptionController.cardPatch);
app.delete("/api/v1/card/:id", checkToken, descriptionController.cardDelete);
///////////////////////////////////////////////// CARD ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// OFERTA ///////////////////////////////////////////////////////////
app.get("/api/v1/offer", offerController.offerGet);
app.post(
  "/api/v1/offer",
  checkToken,
  upload.single("image"),
  offerController.offerPost
);
app.patch(
  "/api/v1/offer/:id?",
  checkToken,
  upload.single("image"),
  offerController.offerPatch
);
app.delete("/api/v1/offer", checkToken, offerController.offerDelete);
///////////////////////////////////////////////// OFERTA ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// TV ///////////////////////////////////////////////////////////
app.get("/api/v1/tv", tvController.tvGet);
app.post("/api/v1/tv", checkToken, upload.single("image"), tvController.tvPost);
app.patch(
  "/api/v1/tv/:id?",
  checkToken,
  upload.single("image"),
  tvController.tvPatch
);

app.delete("/api/v1/tv", checkToken, tvController.tvDelete);
///////////////////////////////////////////////// TV ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// CARD PLANO  ///////////////////////////////////////////////////////////

app.get("/api/v1/plans", checkToken, plansController.plansGet);
app.post(
  "/api/v1/plans/create",
  checkToken,
  upload.array("images"),
  plansController.plansCreate
);
app.delete("/api/v1/plans/delete", checkToken, plansController.plansDelete);

// app.patch(
//   "/api/v1/plans/patch",
//   checkToken,
//   upload.single("image"),
//   plansController.cardPlansPatch
// );
///////////////////////////////////////////////// CARD PLANO ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// BENEFITS ///////////////////////////////////////////////////////////
app.get("/api/v1/additional", checkToken, additionalController.additionalGet);
app.post(
  "/api/v1/additional/create",
  checkToken,
  upload.single("image"),
  additionalController.additionalCreate
);
app.delete(
  "/api/v1/additional/delete",
  checkToken,
  additionalController.additionalDelete
);

////////////////////////AdditionalController//////////////////////// BENEFITS ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// CATEGORY PLAN ///////////////////////////////////////////////////////////
app.get(
  "/api/v1/category-plan",
  checkToken,
  categoryPlanController.categoryPlanGet
);

app.post(
  "/api/v1/category-plan/create",
  checkToken,
  upload.single("image"),
  categoryPlanController.categoryPlanCreate
);

app.delete(
  "/api/v1/category-plan/delete",
  checkToken,
  categoryPlanController.categoryPlanDelete
);
///////////////////////////////////////////////// CATEGORY PLAN ///////////////////////////////////////////////////////////

mongoose
  .connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // ssl: true,
  })
  .then(() => {
    app.listen(3000);
    console.log("Conectado ao banco");
  })
  .catch((err) => console.log(err));
