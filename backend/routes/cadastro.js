import express from 'express';
import usuarioController from '../controllers/cadastroController.js';

const router = express.Router();

router.get('/', usuarioController.listarUsuarios);

router.post('/', usuarioController.cadastrarUsuario);

export default router;