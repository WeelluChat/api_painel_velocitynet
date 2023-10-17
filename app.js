require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const storage = require("./src/middleware/storage");
const upload = multer({ storage });
const checkToken = require("./src/middleware/checktoken");
const sliderController = require("./src/controllers/sliderController");
const loginController = require("./src/controllers/loginController");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa api!" });
});

app.get("/listar-slider", sliderController.listarSlider);

app.get("/uploads/:nomeDoArquivo", sliderController.verArquivo);

app.post("/slider", checkToken, upload.single("foto"), sliderController.slider);

app.post("/login", loginController.login);

app.post("/auth/register", loginController.authRegister);

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    app.listen(3000);
    console.log("Conectado ao banco");
  })
  .catch((err) => console.log(err));
