import { Router } from "express";
import { db } from "../database/db.js";

async function obterServicos(req, res) {
    try {
        const servicos = await db.all("SELECT * FROM servicos");
        return res.status(200).json(servicos);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar serviços" });
    }
}

export { 
    obterServicos,
}