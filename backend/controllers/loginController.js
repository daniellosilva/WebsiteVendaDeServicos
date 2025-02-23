const fs = require('fs'); // Para ler o arquivo JSON
const path = require('path'); // Para definir o caminho do arquivo
const crypto = require('crypto'); // Para criptografar a senha
const querystring = require('querystring'); // Para decodificar dados de formulários

// Caminho do banco de dados (usuarios.json)
const dataDir = path.join(__dirname, '../database');
const usuariosPath = path.join(dataDir, 'usuarios.json');

const loginController = {
  // Função para fazer login (POST /api/login)
  fazerLogin(req, res) {
    let body = '';

    // 1️⃣ Receber os dados do login
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        let dados;
        const contentType = req.headers['content-type'];

        // 2️⃣ Verificar o tipo de conteúdo recebido
        if (contentType === 'application/json') {
          dados = JSON.parse(body); // Se for JSON, converte os dados para objeto
        } else if (contentType === 'application/x-www-form-urlencoded') {
          dados = querystring.parse(body); // Se for formulário, decodifica os dados
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Tipo de conteúdo não suportado.' }));
        }

        const { email, senha } = dados;

        // 3️⃣ Validação: e-mail e senha não podem estar vazios
        if (!email || !senha) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'E-mail e senha são obrigatórios.' }));
        }

        // 4️⃣ Ler o arquivo usuarios.json
        const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));

        // 5️⃣ Procurar o usuário pelo e-mail
        const usuario = usuarios.find(u => u.email === email);

        if (!usuario) {
          // Se o e-mail não existir no banco, retorna erro
          res.writeHead(401, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'E-mail ou senha inválidos.' }));
        }

        // 6️⃣ Gerar hash da senha que o usuário digitou
        const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

        // 7️⃣ Comparar a senha digitada com a senha salva no banco
        if (usuario.senha !== senhaHash) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'E-mail ou senha inválidos.' }));
        }

        // 8️⃣ Se tudo estiver certo, retorna sucesso no login
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Login bem-sucedido!', usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } }));
      } catch (err) {
        console.error('Erro ao processar login:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno no servidor.' }));
      }
    });
  }
};

module.exports = loginController;
