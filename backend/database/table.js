import { db } from './db.js'; // Importe o banco de dados

// Cria a tabela de serviços se ela não existir
async function criarTabelas() {
  try {
    await db.run(`CREATE TABLE IF NOT EXISTS servicos (
      id TEXT PRIMARY KEY,
      nome TEXT,
      img TEXT,
      descricao TEXT,
      avaliacao TEXT
    );`);
    console.log('Tabela "servicos" criada ou já existente.');
  } catch (err) {
    console.error('Erro ao criar tabela de serviços:', err);
  }
}

// Cria a tabela de usuários se ela não existir
async function criarTabelaUsuarios() {
  try {
    await db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      sobrenome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );`);
    console.log('Tabela "usuarios" criada ou já existente.');
  } catch (err) {
    console.error('Erro ao criar tabela de usuários:', err);
  }
}

// Executa as funções para criar as tabelas
async function inicializarBancoDeDados() {
  await criarTabelas();
  await criarTabelaUsuarios();
}

inicializarBancoDeDados().then(() => {
  console.log('Tabelas criadas com sucesso.');
}).catch(err => {
  console.error('Erro ao criar tabelas:', err);
});