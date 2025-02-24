import express from 'express';
import loginController from '../controllers/loginController.js';

const routerLogin = express.Router();

// Rota para fazer login (POST /api/login)
routerLogin.post('/', loginController.fazerLogin);

export default routerLogin;