import { autor } from "../models/Autor.js";

class AutorController {

  static async listarAutores (req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });            
    }
  }

  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).send(autorEncontrado);
      } else {
        res.status(404).send({ message: "erro 404 Autor não encontrado"});            
      }
    } catch (erro) {
      next(erro);
    }
  }
        
  static async cadastrarAutor (req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json( {
        message: "201 Criado com sucesso",
        autor: novoAutor
      });
    } catch (erro) {
      next(erro);
    }
  }
        
  static async atualizarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "autor atualizado"});
    } catch (erro) {
      next(erro);            
    }
  }

  static async deletarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({message: "autor apagado"});
    } catch (erro) {
      next(erro);           
    }
  }
}

export default AutorController;
