require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const multer = require("multer");

const storage = require("./src/middleware/storage");
const storageArray = require("./src/middleware/storageArray");

const upload = multer({ storage });

const uploadArray = multer({ storage: storageArray });

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
const cardPlanController = require("./src/controllers/cardPlanController");
const ComplementController = require("./src/controllers/ComplementController");
const RouterController = require("./src/controllers/routerController");
//importando o as propriedades da pasta CandidateController
const CandidateController = require("./src/controllers/CandidateController");
const { combosImagesGet } = require("./src/controllers/combosController");
const combosController = require("./src/controllers/combosController")
const MontarController = require("./src/controllers/montarComboController")
const PerguntasController = require("./src/controllers/perguntasController")
const CardsPlanos = require("./src/controllers/CardsController")



app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get("/api/v1/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa api!" });
});

app.get("/api/v1/uploads/:nomeDoArquivo", sliderController.verArquivo);

////////////////////////////////////////////////// COMBOS ///////////////////////////////////////////////////////////
app.get('/api/v1/combos', combosController.combosImagesGet)
app.post('/api/v1/combos', combosController.combosImagesPost)
app.delete('/api/v1/combos/:id', combosController.combosImagesDelete)
////////////////////////////////////////////////// COMBOS ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// SLIDER ///////////////////////////////////////////////////////////

app.get("/api/v1/slider", sliderController.sliderGet); // agora retorna todos
app.post("/api/v1/slider", sliderController.sliderUpload, sliderController.sliderPost);
app.patch("/api/v1/slider", sliderController.sliderUpload, sliderController.sliderPatch);
app.delete("/api/v1/slider", sliderController.sliderDelete);
app.get("/api/v1/slider/view/:nomeDoArquivo", sliderController.verArquivo);

///////////////////////////////////////////////// SLIDER ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// LOGIN ///////////////////////////////////////////////////////////
app.post("/api/v1/login", loginController.login);
app.post("/api/v1/auth/login", loginController.authLogin);
app.post("/api/v1/auth/register", loginController.authRegister);
app.get("/api/v1/auth/users", loginController.authUser)
app.put('/api/v1/auth/password/:id', loginController.authPassword)
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

///////////////////////////////////////////////// PLANO  ///////////////////////////////////////////////////////////

app.get("/api/v1/plans", plansController.plansGet);
app.post(
  "/api/v1/plans/create",
  checkToken,
  uploadArray.array("images"),
  plansController.plansCreate
);
app.delete("/api/v1/plans/delete", checkToken, plansController.plansDelete);

app.patch(
  "/api/v1/plans/update",
  uploadArray.array("images"),
  checkToken,
  plansController.plansPatch
);

// app.patch(
//   "/api/v1/plans/update-imagem",
//   upload.single("image"),
//   checkToken,
//   plansController.plansPatchImagem
// );

// app.patch(
//   "/api/v1/plans/update-plan-base",
//   upload.single("image"),
//   checkToken,
//   plansController.plansPatchPlanBase
// );

///////////////////////////////////////////////// PLANO ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// ADDITIONAL ///////////////////////////////////////////////////////////
app.get("/api/v1/additional", additionalController.additionalGet);
app.post(
  "/api/v1/additional/create",
  checkToken,
  upload.single("image"),
  additionalController.additionalCreate
);
app.patch(
  "/api/v1/additional/update",
  checkToken,
  upload.single("image"),
  additionalController.additionalPatch
);
app.delete(
  "/api/v1/additional/delete",
  checkToken,
  additionalController.additionalDelete
);

////////////////////////ADDITIONAL//////////////////////// ADDITIONAL ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// CATEGORY PLAN ///////////////////////////////////////////////////////////////////////////
// GET e POST
app.get("/api/v1/category-plan", categoryPlanController.categoryPlanGet);
app.post("/api/v1/category-plan/create", categoryPlanController.uploadCategoryFields, categoryPlanController.categoryPlanCreate);

// PATCH com params
app.patch("/api/v1/category-plan/patch/:id", categoryPlanController.uploadLogoOnly, categoryPlanController.categoryPlanPatch);
app.patch("/api/v1/category-plan/create-card", categoryPlanController.uploadImagesOnly, categoryPlanController.categoryPlanCreateCard);
app.patch("/api/v1/category-plan/update-card/:idCategoria/:nomeAntigoImagem", categoryPlanController.uploadImagemUnica, categoryPlanController.categoryPlanAtualizarImagemCard);

// DELETE com params
app.delete("/api/v1/category-plan/delete/:id", categoryPlanController.categoryPlanDelete);
app.delete("/api/v1/category-plan/delete-card/:idCategory/:cardName", categoryPlanController.categoryPlanDeleteCard);

///////////////////////////////////////////////// CATEGORY PLAN ///////////////////////////////////////////////////////////

// ///////////////////////////////////////////////// ROUTER ///////////////////////////////////////////////////////////
app.get("/api/v1/router", RouterController.routerGet);
app.post("/api/v1/router/create", checkToken, RouterController.routerCreate);
app.delete("/api/v1/router/delete", checkToken, RouterController.routerDelete);
app.patch("/api/v1/router/update", checkToken, RouterController.routerPatch);
// ///////////////////////////////////////////////// ROUTER ///////////////////////////////////////////////////////////

///////////////////////////////////////////////// COMPLEMENT INFORMATION ///////////////////////////////////////////////////////////
app.get("/api/v1/complement", ComplementController.complementGet);

app.post("/api/v1/complement-get-id", ComplementController.complementGetByID);

app.post(
  "/api/v1/complement/create",
  checkToken,
  upload.single("image"),
  ComplementController.complementCreate
);

app.patch(
  "/api/v1/complement/update",
  checkToken,
  upload.single("image"),

  ComplementController.complementPatch
);

app.delete(
  "/api/v1/complement/delete",
  checkToken,
  ComplementController.complementDelete
);

///////////////////////////////////////////////// COMPLEMENT INFORMATION ///////////////////////////////////////////////////////////

////////////////////////////////////////////////////// CANDIDATE ////////////////////////////////////////////////////////////////////

app.get("/api/v1/candidate/get",

  CandidateController.candidateGet);

app.post(
  "/api/v1/candidate/post",
  upload.single("image"),
  CandidateController.CandidatePost
  //tiago
);

app.post("/api/v1/candidate/delete", CandidateController.candidateDelete);

////////////////////////////////////////////////////  CANDIDATE  ///////////////////////////////////////////////////////////////////

////////////////////////////////////////////////// email controllers ///////////////////////////////////////////////////////////////

app.use('/api/v1', require('./src/controllers/emailControllers'));
////////////////////////////////////////////////// email controllers ///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////// MONTAR COMBOS ////////////////////////////////////////////////////////////////////////
// app.get("/api/v1/planos", MontarController.MontarGet);
// app.post(
//   "/api/v1/criarPlanos",
//   MontarController.uploadFiles,
//   MontarController.MontarPost
// );
// app.put(
//   "/api/v1/atualizarPlanos/:id",
//   MontarController.uploadFiles,
//   MontarController.MontarPut
// );
// app.delete("/api/v1/deletarPlanos/:id", MontarController.MontarDelete);
app.get("/api/v1/planos", MontarController.CombosGet);
app.post("/api/v1/criarPlanos", MontarController.CombosPost);
app.put("/api/v1/atualizarPlanos/:id", MontarController.CombosPut);
app.delete("/api/v1/deletarPlanos/:id", MontarController.CombosDelete);
app.put("/api/v1/atualizarPlano", MontarController.AtualizarPlanoViaBody);
app.put("/api/v1/atualizarBeneficio", MontarController.AtualizarBeneficioViaBody);
app.put("/api/v1/atualizarDetalhe", MontarController.AtualizarDetalheViaBody);
app.put("/api/v1/beneficioImage", MontarController.AtualizarImagemBeneficio);
app.patch("/api/v1/adicionarPlano", MontarController.AdicionarPlanoAoCombo);
///////////////////////////////////////////////// MONTAR COMBOS ////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////// PERGUNTAS /////////////////////////////////////////////////////////////////////////////
app.get("/api/v1/perguntas", PerguntasController.perguntasGet);
app.post("/api/v1/criarPerguntas", PerguntasController.pergutasPost);
app.delete("/api/v1/deletarPerguntas/:id", PerguntasController.perguntasDelete);
app.put("/api/v1/atualizarPerguntas/:id", PerguntasController.perguntasPut);
//////////////////////////////////////////////// PERGUNTAS /////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////// CARDS PLANOS ////////////////////////////////////////////////////////////////////////////
app.get("/api/v1/cards", CardsPlanos.CardsGet);
app.post("/api/v1/cards", CardsPlanos.CardsPost);
app.delete("/api/v1/cards/:id", CardsPlanos.CardsDelete);
app.put("/api/v1/cards/:id", CardsPlanos.CardsPut);
app.patch("/api/v1/cards", CardsPlanos.CardsPatch);
///////////////////////////////////////////////// CARDS PLANOS ////////////////////////////////////////////////////////////////////////////


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
