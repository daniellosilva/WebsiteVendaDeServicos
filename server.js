const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Definindo o diretório de arquivos estáticos
  const staticDir = path.join(__dirname, 'public');

  // Servindo arquivos estáticos
  if (req.url.startsWith('/css/') || req.url.startsWith('/img/')) {
    const filePath = path.join(staticDir, req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
      case '.css':
        contentType = 'cadastro/css';
        break;
      case '.js':
        contentType = 'header/javascript';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1>');
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
    return;
  }

  if (req.url === '/cadastro' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'cadastro.html'), 'utf8', (err, data) => {
      if (err) {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Erro ao carregar página de cadastro' }));
        }
        return;
      }
      if (!res.headersSent) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
    return;
  }

  if (req.url === '/api/cadastro' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const novoUsuario = JSON.parse(body);

        const usuariosPath = path.join(__dirname, 'data', 'usuarios.json');
        const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
        
        const usuarioExistente = usuarios.find(u => u.email === novoUsuario.email);
        if (usuarioExistente) {
          if (!res.headersSent) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Usuário já cadastrado' }));
          }
          return;
        }

        usuarios.push(novoUsuario);
        fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

        if (!res.headersSent) {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Usuário cadastrado com sucesso' }));
        }
      } catch (err) {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Erro ao cadastrar usuário' }));
        }
      }
    });
    return;
  }

  if (!res.headersSent) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});