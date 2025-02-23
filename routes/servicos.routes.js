import { obterServicos } from "../controllers/servicos.controllers.js";

function listarServicos(req, res) {
    obterServicos(req, res);  // Chama a função obterServicos
}

export { listarServicos };  // Exporta a função listarServicos