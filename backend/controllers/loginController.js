import { db } from '../database/db.js'; // Importe a conexão com o banco de dados
import crypto from 'crypto';

const loginController = {
  // Função para fazer login (POST /api/login)
  async fazerLogin(req, res) {
    try {
      const { email, senha } = req.body;

      // Validação básica
      if (!email || !senha) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
      }

      // Buscar o usuário pelo e-mail no banco de dados
      const usuario = await db.get(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );

      // Verificar se o usuário existe
      if (!usuario) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
      }

      // Gerar hash da senha fornecida
      const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      if (usuario.senha !== senhaHash) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
      }

      // Se tudo estiver correto, retornar sucesso no login
      res.status(200).json({
        message: 'Login bem-sucedido!',
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          email: usuario.email,
        },
      });
    } catch (err) {
      console.error('Erro ao processar login:', err);
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
};

export default loginController;