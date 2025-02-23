import express from 'express';
import {db} from '../database/db.js'; // Importe o banco de dados

const routerCadastro = express.Router();

routerCadastro.post('/cadastro', async (req, res) => {
  try {
    const { nome, sobrenome, email, senha } = req.body;

    // Verifique se o e-mail já está cadastrado
    const usuarioExistente = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // Insira o novo usuário no banco de dados
    await db.run(
      'INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)',
      [nome, sobrenome, email, senha]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

export default routerCadastro;