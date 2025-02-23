const express = require('express');
const path = require('path');
const cadastroRouter = require('./routes/cadastro');

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Configura o Express para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Rota para servir o arquivo cadastro.html
app.get('/cadastro.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/cadastro.html'));
});

// Usa as rotas definidas em cadastroRouter
app.use(cadastroRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});