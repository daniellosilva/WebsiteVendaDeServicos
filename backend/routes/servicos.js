const fs = require('fs');
const path = require('path');

const servicosPath = path.join(__dirname, '../database', 'seed.js');

function listarServicos(req, res) {
  fs.readFile(servicosPath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Erro ao ler serviços' }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  });
}

module.exports = { listarServicos };