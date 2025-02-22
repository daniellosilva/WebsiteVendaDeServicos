const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const querystring = require('querystring');

const dataDir = path.join(__dirname, '../data');
const usuariosPath = path.join(dataDir, 'usuarios.json');

// Verifica se a pasta existe; se não, cria
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Verifica se o arquivo existe; se não, cria um array vazio
if (!fs.existsSync(usuariosPath)) {
  fs.writeFileSync(usuariosPath, '[]');
}

// Função para listar usuários (GET /api/cadastro)
function listarUsuarios(req, res) {
  try {
    // Lê o arquivo de usuários
    const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));

    // Resposta com a lista de usuários
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(usuarios));
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Erro interno no servidor' }));
  }
}

// Função para cadastrar usuário (POST /api/cadastro)
function cadastrarUsuario(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const { nome, sobrenome, email, senha } = JSON.parse(body);

      // Validação básica
      if (!nome || !sobrenome || !email || !senha) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Todos os campos são obrigatórios.' }));
      }

      // Verificar se o e-mail já está cadastrado
      const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
      const usuarioExistente = usuarios.find(u => u.email === email);

      if (usuarioExistente) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'E-mail já cadastrado.' }));
      }

      // Gerar hash da senha
      const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

      // Criar novo usuário
      const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        sobrenome,
        email,
        senha: senhaHash,
      };

      // Adicionar o novo usuário ao array
      usuarios.push(novoUsuario);

      // Salvar o array atualizado no arquivo
      fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

      // Resposta de sucesso
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario }));
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erro interno no servidor.' }));
    }
  });
}

module.exports = { listarUsuarios, cadastrarUsuario };