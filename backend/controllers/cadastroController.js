import fs from 'fs';  
import path from 'path';
import crypto from 'crypto';
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
      res.status(200).json(usuarios);
    } catch (err) {
      console.error('Erro ao listar usuários:', err);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  },

  // Função para cadastrar usuário (POST /api/cadastro)
  cadastrarUsuario(req, res) {
    try {
      const { nome, sobrenome, email, senha } = req.body;

      // Validação básica
      if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      // Verificar se o e-mail já está cadastrado
      const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
      const usuarioExistente = usuarios.find(u => u.email === email);

      if (usuarioExistente) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
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
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
};

export default usuarioController;