import { Router } from 'express';
import { db } from '../database/db.js';
import { obterServicos } from '../controllers/servicos.controllers.js';



const express = require('express');
const servicosRouter = Router()

servicosRouter.get('/', obterServicos)

// Defina suas rotas aqui
router.get('/api/servicos', (req, res) => {
  res.send('Lista de serviços');
});

export default servicosRouter