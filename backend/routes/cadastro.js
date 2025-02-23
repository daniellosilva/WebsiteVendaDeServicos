const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/cadastroController');

// Rota para listar usuários (GET /api/cadastro)
router.get('/api/cadastro', usuarioController.listarUsuarios);

// Rota para cadastrar usuário (POST /api/cadastro)
router.post('/api/cadastro', usuarioController.cadastrarUsuario);

module.exports = router;