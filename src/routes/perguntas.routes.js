const { Router } = require("express");
const PerguntasController = require("../controllers/perguntasController");

const router = Router();

router.get("/perguntas", PerguntasController.perguntasGet);
router.post("/criarPerguntas", PerguntasController.perguntasPost);
router.put("/atualizarPerguntas/:id", PerguntasController.perguntasPut);
router.delete("/deletarPerguntas/:id", PerguntasController.perguntasDelete);

module.exports = router;
