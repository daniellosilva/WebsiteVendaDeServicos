import { obterServicos } from "../controllers/servicos.controllers.js";

function listarServicos(req, res) {
    obterServicos(req, res);
}

export { listarServicos };