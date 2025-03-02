import { db } from '../database/db.js'; 
import crypto from 'crypto';

const usuarioController = {
  async listarUsuarios(req, res) {
    try {
      const usuarios = await db.all('SELECT * FROM usuarios');

      res.status(200).json(usuarios);
    } catch (err) {
      console.error('Erro ao listar usuários:', err);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  },

  async cadastrarUsuario(req, res) {
    try {
      const { nome, sobrenome, email, senha } = req.body;

      if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const usuarioExistente = await db.get(
        'SELECT id FROM usuarios WHERE email = ?',
        [email]
      );

      if (usuarioExistente) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

      const result = await db.run(
        'INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)',
        [nome, sobrenome, email, senhaHash]
      );

      res.status(201).json({
        message: 'Usuário cadastrado com sucesso!',
        usuario: {
          id: result.lastID, 
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