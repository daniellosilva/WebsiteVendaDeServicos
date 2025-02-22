const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const usuariosPath = path.join(__dirname, '../data', 'usuarios.json');

function cadastrarUsuario(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { nome, email, senha } = JSON.parse(body);

    // Validação básica
    if (!nome || !sobrenome || !email || !senha ) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Todos os campos são obrigatórios' }));
    }

    const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
    const usuarioExistente = usuarios.find(u => u.email === email);

    if (usuarioExistente) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'E-mail já cadastrado' }));
    }

    // Gerar hash da senha
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

    const novoUsuario = {
      id: usuarios.length + 1,
      nome,
      sobrenome,
      email,
      senha: senhaHash,
    };

    usuarios.push(novoUsuario);
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Usuário cadastrado com sucesso' }));
  });
}

module.exports = { cadastrarUsuario };