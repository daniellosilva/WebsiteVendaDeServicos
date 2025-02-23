import express from "express";
import servicosRoutes from "./routes/servicos.routes.js";
//import { listarUsuarios, cadastrarUsuario } from './routes/cadastro.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/servicos", servicosRoutes.listarServicos);
//app.post("/api/cadastro", cadastrarUsuario);
//app.get("/api/cadastro", listarUsuarios);

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public" });
});

app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});