import { db } from '../database/db.js'; // Importe a conexão com o banco de dados
import crypto from 'crypto';

const usuarioController = {
  // Função para listar usuários (GET /api/cadastro)
  async listarUsuarios(req, res) {
    try {
      // Consulta todos os usuários no banco de dados
      const usuarios = await db.all('SELECT * FROM usuarios');

      // Resposta com a lista de usuários
      res.status(200).json(usuarios);
    } catch (err) {
      console.error('Erro ao listar usuários:', err);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  },

  // Função para cadastrar usuário (POST /api/cadastro)
  async cadastrarUsuario(req, res) {
    try {
      const { nome, sobrenome, email, senha } = req.body;

      // Validação básica
      if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      // Verificar se o e-mail já está cadastrado
      const usuarioExistente = await db.get(
        'SELECT id FROM usuarios WHERE email = ?',
        [email]
      );

      if (usuarioExistente) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      // Gerar hash da senha
      const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

      // Inserir o novo usuário no banco de dados
      const result = await db.run(
        'INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)',
        [nome, sobrenome, email, senhaHash]
      );

      // Resposta de sucesso
      res.status(201).json({
        message: 'Usuário cadastrado com sucesso!',
        usuario: {
          id: result.lastID, // ID gerado automaticamente
          nome,
          sobrenome,
          email,
        },
      });
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
};

export default usuarioController;