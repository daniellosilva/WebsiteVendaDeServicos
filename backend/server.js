const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/cadastro' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const novoUsuario = JSON.parse(body);

      try {
        const usuariosPath = path.join(__dirname, 'data', 'usuarios.json');
        const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
        
        const usuarioExistente = usuarios.find(u => u.email === novoUsuario.email);
        if (usuarioExistente) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Usuário já cadastrado' }));
          return;
        }

        usuarios.push(novoUsuario);
        fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Usuário cadastrado com sucesso' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro ao cadastrar usuário' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
