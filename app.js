require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./src/routes");

const app = express();

app.set("etag", false);

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

app.get("/api/v1/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa api!" });
});

app.use("/api/v1", routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.URL_DB)
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    console.log("Conectado ao banco");
  })
  .catch((err) => console.error("Erro ao conectar ao banco:", err));
