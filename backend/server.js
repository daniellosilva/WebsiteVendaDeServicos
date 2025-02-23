import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import routerCadastro from './routes/cadastro.js';

import servicosRouter from './routes/servicos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
// Middleware para processar JSON
app.use(express.json());

// Configura o Express para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Rota para servir o arquivo cadastro.html
app.get('/cadastro.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/cadastro.html'));
});

// Usa as rotas definidas em cadastroRouter
app.use(routerCadastro);

app.use('/api/servicos', servicosRouter)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
