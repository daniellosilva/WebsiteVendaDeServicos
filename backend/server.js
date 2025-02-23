const express = require('express');
const path = require('path');
const app = express();

// Configura o Express para servir arquivos estáticos da pasta "frontend"
app.use(express.static(path.join(__dirname, '../public')));

// Rotas da API
const cadastroRouter = require('./routes/cadastro');
app.use('/api', cadastroRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});