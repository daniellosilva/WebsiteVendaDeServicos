const http = require('http');
const fs = require('fs');
const path = require('path');

// Importar rotas
const servicosRoutes = require('./routes/servicos');
const contatoRoutes = require('./routes/contato');
const cadastroRoutes = require('./routes/cadastro');

const PORT = 5000;

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  // Rotas
  if (req.url === '/api/servicos' && req.method === 'GET') {
    servicosRoutes.listarServicos(req, res);
  } else if (req.url === '/api/contato' && req.method === 'POST') {
    contatoRoutes.receberMensagem(req, res);
  } else if (req.url === '/api/cadastro' && req.method === 'POST') {
    cadastroRoutes.cadastrarUsuario(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  }
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});