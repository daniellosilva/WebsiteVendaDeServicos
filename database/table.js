import {db} from './db.js'

 async function criarTabelas() {
    await db.run(`CREATE TABLE IF NOT EXISTS servicos (
        id TEXT PRIMARY KEY,
        nome TEXT,
        img TEXT,
        descricao TEXT,
        descricao TEXT,
        avaliacao TEXT,
        valor REAL
        )     
    `);
}

criarTabelas().then(
    () => console.log("Tabela criada"));