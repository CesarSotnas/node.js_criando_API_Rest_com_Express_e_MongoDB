import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "erro 400 não encontrato"});
  } else {
    res.status(500).send({message: "Erro 500 interno de servidor"});
  }
}

export default manipuladorDeErros;