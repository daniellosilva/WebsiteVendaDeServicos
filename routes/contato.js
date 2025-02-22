const fs = require('fs');
const path = require('path');

const contatosPath = path.join(__dirname, '../data', 'contatos.json');

function receberMensagem(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const novaMensagem = JSON.parse(body);
    const contatos = JSON.parse(fs.readFileSync(contatosPath, 'utf8'));
    contatos.push(novaMensagem);
    fs.writeFileSync(contatosPath, JSON.stringify(contatos, null, 2));

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Mensagem recebida com sucesso' }));
  });
}

module.exports = { receberMensagem };