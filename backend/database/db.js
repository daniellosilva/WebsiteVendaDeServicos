import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve o caminho absoluto para o banco de dados
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../database/database.db'); // Caminho absoluto

// Abre a conexão com o banco de dados
export const db = await open({
  filename: dbPath, // Usa o caminho absoluto
  driver: sqlite3.Database,
});

// Verifica se a tabela de usuários existe; se não, cria
await db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sobrenome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  );
`);