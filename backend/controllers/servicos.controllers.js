import { Router } from "express"
import { db } from "../../database/db.js"

async function obterServicos (req, res) {
    const servicos = await db.all("SELECT * FROM servicos")
    return res.status(200).json(servicos)
}

export {
    obterServicos,
}