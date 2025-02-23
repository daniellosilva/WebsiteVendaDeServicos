const express = require('express');
const router = express.Router();

// Defina suas rotas aqui
router.get('/servicos', (req, res) => {
  res.send('Lista de serviços');
});

// Exporta o router
module.exports = router;