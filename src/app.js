import express from "express";
import db from "./config/dbConnect.js";
import routes from "./config/routes/index.js";
import manipuladorDeErros from "./config/middlewares/manipuladorDeErros.js";

const conexao = db;

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
routes(app);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;