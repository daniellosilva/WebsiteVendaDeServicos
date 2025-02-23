import { db } from "./db.js"

const servicos = [
    {
        id: "servico-0",
        img: "../img/chaveiro.png",
        nome: "Chaveiro",
        descricao: "",
        avaliacao: "",
    },
    {
        id: "servico-1",
        img: "../img/dicas-para-trocar-o-soquete-de-lampada.png",
        nome: "Eletricista",
        descricao: "",
        avaliacao: "",
    },
    {
        id: "servico-2",
        img: "../img/suprematec-desentupidora-servico-encanador-profissional-1.png",
        nome: "Encanador",
        descricao: "",
        avaliacao: "",
    },
    {
        id: "servico-3",
        img: "../img/2020-06-10-instalacao-de-grama-sintetica-na-terra (1).png",
        nome: "Jardineiro",
        descricao: "",
        avaliacao: "",
    },
    {
        id: "servico-4",
        img: "../img/marceneiro.png",
        nome: "Marceneiro",
        descricao: "",
        avaliacao: "",
    },
    {
        id: "servico-5",
        img: "../img/pedreiro.png",
        nome: "Pedreiro",
        descricao: "",
        avaliacao: "",
    },
    {
        id: "servico-6",
        img: "../img/pintor.png",
        nome: "Pintor",
        descricao: "",
        avaliacao: "",
    },
    {
        id: "servico-7",
        img: "../img/piscineiro.png",
        nome: "Piscineiro",
        descricao: "",
        avaliacao: "",
    },
    {
        id: "servico-8",
        img: "../img/vidraceiro.png",
        nome: "Vidraceiro",
        descricao: "",
        avaliacao: "",
    },
];

for (let x = 0; x <servicos.length; x++) {
    await db.run(`
        INSERT INTO servicos (id, img, nome, descricao, avaliacao) VALUES(?,?,?,?,?)
    `,[
        servicos[x].id, 
        servicos[x].img, 
        servicos[x].nome, 
        servicos[x].descricao, 
        servicos[x].avaliacao]
    )
}