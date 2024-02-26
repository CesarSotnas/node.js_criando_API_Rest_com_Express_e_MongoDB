import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);         
    }
  }

  static async listarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);  
    }
  }
        
  static async cadastrarLivro (req, res,next) {
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
      // eslint-disable-next-line no-unused-vars
      const livroCriado = await livro.create(livroCompleto);
            
      res.status(201).json( {
        message: "Criado com sucesso",
        livro: novoLivro
      });
    } catch (erro) {
      next(erro);  
    }
  }
        
  static async atualizarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "livro atualizado"});
    } catch (erro) {
      next(erro);  
    }
  }

  static async deletarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({message: "livro apagado"});
    } catch (erro) {
      next(erro);  
    }
  }

  static async listarLivrosPorEditor (req, res, next) {
    const editora = req.query.editora;
        
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);  
    }
  }
}

export default LivroController;