import { db } from "./db.js"

const servicos = [
    {
        id: "servico-0",
        img: "",
        nome: "Chaveiro",
        descricao: "",
        avaliacao: "",
        valor: "",
    },
    {
        id: "servico-1",
        img: "",
        nome: "Eletricista",
        descricao: "",
        avaliacao: "",
        valor: "",
    },
    {
        id: "servico-2",
        img: "",
        nome: "Encanador",
        descricao: "",
        avaliacao: "",
        valor: "",
    },
    {
        id: "servico-3",
        img: "",
        nome: "Jardineiro",
        descricao: "",
        avaliacao: "",
        valor: "",
    },
    {
        id: "servico-4",
        img: "",
        nome: "Marceneiro",
        descricao: "",
        avaliacao: "",
        valor: "",
    },
    {
        id: "servico-5",
        img: "",
        nome: "Pedreiro",
        descricao: "",
        avaliacao: "",
        valor: "",
    },
    {
        id: "servico-6",
        img: "",
        nome: "Pintor",
        descricao: "",
        avaliacao: "",
        valor: "",
    },
    {
        id: "servico-7",
        img: "",
        nome: "Piscineiro",
        descricao: "",
        avaliacao: "",
        valor: "",
    },
    {
        id: "servico-8",
        img: "",
        nome: "Vidraceiro",
        descricao: "",
        avaliacao: "",
        valor: "",
    },
];

for (let x = 0; x <servicos.length; x++) {
    await db.run(`
        INSERT INTO servicos (id, img, nome, descricao, avaliacao, valor) VALUES(?,?,?,?,?,?)
    `,[
        servicos[x].id, 
        servicos[x].img, 
        servicos[x].nome, 
        servicos[x].descricao, 
        servicos[x].avaliacao, 
        servicos[x].valor]
    )
}