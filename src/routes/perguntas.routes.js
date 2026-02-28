const { Router } = require("express");
const PerguntasController = require("../controllers/perguntasController");
const checkToken = require("../middleware/checktoken");

const router = Router();

router.get("/perguntas", PerguntasController.perguntasGet);
router.post("/criarPerguntas", checkToken, PerguntasController.perguntasPost);
router.put("/atualizarPerguntas/:id", checkToken, PerguntasController.perguntasPut);
router.delete("/deletarPerguntas/:id", checkToken, PerguntasController.perguntasDelete);

module.exports = router;
