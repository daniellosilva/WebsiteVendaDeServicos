const fs = require('fs');
const path = require('path');

// Função para ler e escrever JSON
const readJSON = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

const writeJSON = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Rota para registrar usuário
if (req.url === '/api/cadastro' && req.method === 'POST') {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const novoUsuario = JSON.parse(body);

    try {
      const usuarios = await readJSON(path.join(__dirname, 'data', 'usuarios.json'));
      
      // Verifica se o usuário já existe
      const usuarioExistente = usuarios.find(u => u.email === novoUsuario.email);
      if (usuarioExistente) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Usuário já cadastrado' }));
        return;
      }

      // Adiciona o novo usuário e salva o arquivo
      usuarios.push(novoUsuario);
      await writeJSON(path.join(__dirname, 'data', 'usuarios.json'), usuarios);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Usuário cadastrado com sucesso' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erro ao cadastrar usuário' }));
    }
  });
}
