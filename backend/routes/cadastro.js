import express from 'express';
import usuarioController from '../controllers/cadastroController.js';

const router = express.Router();

// Rota para listar usuários (GET /api/cadastro)
router.get('/', usuarioController.listarUsuarios);

// Rota para cadastrar usuário (POST /api/cadastro)
router.post('/', usuarioController.cadastrarUsuario);

export default router;