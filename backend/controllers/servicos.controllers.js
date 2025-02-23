import { Router } from "express"
import { db } from "../../database/db.js"

async function obterServicos (req, res) {
    const filmes = await db.all("SELECT * FROM servicos")
    return res.status(200).json(filmes)
}

export {
    obterServicos,
}