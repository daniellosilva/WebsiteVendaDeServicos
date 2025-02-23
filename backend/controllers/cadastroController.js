import fs from 'fs';  // Importando fs corretamente
import path from 'path';
import crypto from 'crypto';
import querystring from 'querystring'; // Para decodificar application/x-www-form-urlencoded

import { fileURLToPath } from 'url';

// Cria o __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../database');
const usuariosPath = path.join(dataDir, 'usuarios.json');

// Verifica se a pasta existe; se não, cria
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Verifica se o arquivo existe; se não, cria um array vazio
if (!fs.existsSync(usuariosPath)) {
  fs.writeFileSync(usuariosPath, '[]');
}

const usuarioController = {
  // Função para listar usuários (GET /api/cadastro)
  listarUsuarios(req, res) {
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
  },

  // Função para cadastrar usuário (POST /api/cadastro)
  cadastrarUsuario(req, res) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        let dados;
        const contentType = req.headers['content-type'];

        // Verifica o tipo de conteúdo
        if (contentType === 'application/json') {
          // Se for JSON, faz o parse diretamente
          dados = JSON.parse(body);
        } else if (contentType === 'application/x-www-form-urlencoded') {
          // Se for application/x-www-form-urlencoded, decodifica o corpo
          dados = querystring.parse(body);
        } else {
          // Tipo de conteúdo não suportado
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Tipo de conteúdo não suportado.' }));
        }

        const { nome, sobrenome, email, senha } = dados;

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
  },
};

export default usuarioController;