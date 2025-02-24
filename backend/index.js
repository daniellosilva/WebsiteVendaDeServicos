import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import servicosRouter from './routes/servicos.js';
import routerCadastro from './routes/cadastro.js';
import routerLogin from './routes/login.js';

// Obter o caminho do diretório atual
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Caminho absoluto para o banco de dados
const dbPath = path.resolve(dirname, '../database/database.db');

const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para processar JSON
app.use(express.json());

// Configura o Express para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(dirname, '../public')));

// Rota para servir o arquivo cadastro.html
app.get('/cadastro.html', (req, res) => {
  res.sendFile(path.join(dirname, '../public/cadastro.html'));
});

// Usa as rotas definidas em routerCadastro, servicosRouter e routerLogin
app.use('/api/cadastro', routerCadastro);
app.use('/api/servicos', servicosRouter);
app.use('/api/login', routerLogin);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});