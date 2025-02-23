<<<<<<< HEAD
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
=======
const http = require('http');
const fs = require('fs');
const path = require('path');

// Importar rotas
const servicosRoutes = require('./routes/servicos.routes');
const { listarUsuarios, cadastrarUsuario } = require('./routes/cadastro');

const PORT = 5000;
const publicDir = path.join(__dirname, 'public');
// Criar servidor HTTP

const server = http.createServer((req, res) => {
  
  // Rotas
  if (req.url === '/' || req.url.endsWith('.html')) {
    const filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('<h1>404 Not Found</h1>');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/api/servicos' && req.method === 'GET') {
    servicosRoutes.listarServicos(req, res);
  } else if (req.url === '/api/contato' && req.method === 'POST') {
    contatoRoutes.receberMensagem(req, res);
  } else if (req.url === '/api/cadastro' && req.method === 'POST') {
    cadastrarUsuario(req, res);
  } else if (req.url === '/api/cadastro' && req.method === 'GET') {
    listarUsuarios(req, res);
  } else if (req.url.endsWith('.css')) {
    const filePath = path.join(publicDir, req.url);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('<h1>404 Not Found</h1>');
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } // Servir imagens
  else if (req.url.endsWith('.png') || req.url.endsWith('.jpg') || req.url.endsWith('.jpeg')) {
    const filePath = path.join(publicDir, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('<h1>404 Not Found</h1>');
      }
  
      // Define o Content-Type com base na extensão do arquivo
      const contentType = req.url.endsWith('.png') ? 'image/png' : 'image/jpeg';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  }
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(Servidor rodando na porta ${PORT});
>>>>>>> 72b596aeea0924559cb5cb6b1ab0f92a67a0385d
});