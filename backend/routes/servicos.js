import { Router } from 'express';
import { db } from '../database/db.js';
import { obterServicos } from '../controllers/servicos.controllers.js';

const servicosRouter = Router()

servicosRouter.get('/', obterServicos)

// Defina suas rotas aqui

export default servicosRouter;