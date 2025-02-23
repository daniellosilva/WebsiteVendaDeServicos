import express from 'express';
import usuarioController from '../controllers/cadastroController.js';
const routerCadastro = express.Router();

// Rota para listar usuários (GET /api/cadastro)
routerCadastro.get('http://localhost:5000/api/cadastro', usuarioController.listarUsuarios);

// Rota para cadastrar usuário (POST /api/cadastro)
routerCadastro.post('http://localhost:5000/api/cadastro', usuarioController.cadastrarUsuario);

export default routerCadastro;