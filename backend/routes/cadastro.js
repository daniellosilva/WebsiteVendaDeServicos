app.post('/api/cadastro', async (req, res) => {
    try {
      const { email, nome, sobrenome, senha } = req.body;
  
      // Verifique se o usuário já existe
      const usuarioExistente = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
      if (usuarioExistente) {
        return res.status(400).json({ error: 'Usuário já cadastrado' });
      }
  
      // Insira o novo usuário no banco de dados
      await db.run(
        'INSERT INTO usuarios (email, nome, sobrenome, senha) VALUES (?, ?, ?, ?)',
        [email, nome, sobrenome, senha]
      );
  
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
  });