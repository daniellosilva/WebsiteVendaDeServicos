import { db } from "./db.js"

const servicos = [
    {
        id: "servico-0",
        img: "../img/chaveiro.png",
        nome: "Chaveiro",
        descricao: "O Chaveiro é o profissional responsável por fabricar e fazer cópias de chaves, trocar segredos e realizar manutenção de fechaduras, além de vender equipamentos de segurança (cadeados, travas, chaves personalizadas etc.).",
        avaliacao: "blablabla",
    },
    {
        id: "servico-1",
        img: "../img/dicas-para-trocar-o-soquete-de-lampada.png",
        nome: "Eletricista",
        descricao: "O eletricista é o profissional especializado em instalações elétricas residenciais, comerciais e industriais. Ele atua tanto na instalação de novos componentes elétricos quanto na manutenção e reparo de infraestruturas elétricas já existentes.",
        avaliacao: "blablabla",
    },
    {
        id: "servico-2",
        img: "../img/suprematec-desentupidora-servico-encanador-profissional-1.png",
        nome: "Encanador",
        descricao: "Um encanador ou bombeiro hidráulico é responsável pela instalação e manutenção de sistemas usados para água potável, esgoto e drenagem em sistemas de encanamento.",
        avaliacao: "blablabla",
    },
    {
        id: "servico-3",
        img: "../img/2020-06-10-instalacao-de-grama-sintetica-na-terra (1).png",
        nome: "Jardineiro",
        descricao: "O jardineiro é o profissional responsável por cuidar do jardim de prédios, casas, empresas, parques, condomínios, escolas, etc. É essencial que tenha conhecimentos básicos sobre o meio ambiente e espécies de plantas.",
        avaliacao: "blablabla",
    },
    {
        id: "servico-4",
        img: "../img/marceneiro.png",
        nome: "Marceneiro",
        descricao: "O Marceneiro é o profissional responsável por trabalhar com madeira, construindo e reparando móveis, peças decorativas, utilitárias e outras peças de madeira.. Realiza a medição, entalho, raspagem, ajuste e fixação.",
        avaliacao: "blablabla",
    },
    {
        id: "servico-5",
        img: "../img/pedreiro.png",
        nome: "Pedreiro",
        descricao: "O Pedreiro é o profissional que constrói ou reveste muros, paredes, escadas, vigas, lajes, tectos, telhados, chaminés, etc., em edifícios e outras obras de construção geralmente orientado pelo engenheiro ou Mestre de obras.",
        avaliacao: "blablabla",
    },
    {
        id: "servico-6",
        img: "../img/pintor.png",
        nome: "Pintor",
        descricao: "O Pintor é o profissional responsável pela proteção e decoração de paredes. E têm como proposito melhorar os aspetos estéticos e a sua proteção contra os efeitos da água, corrosão, insetos e fungos (bolores).",
        avaliacao: "blablabla",
    },
    {
        id: "servico-7",
        img: "../img/piscineiro.png",
        nome: "Piscineiro",
        descricao: "A função principal do piscineiro será manter sua piscina pronta para o uso. Para fazer isso, ele precisará realizar a manutenção de diversas maneiras. Isso vai garantir a limpeza e a pureza da água.",
        avaliacao: "blablabla",
    },
    {
        id: "servico-8",
        img: "../img/vidraceiro.png",
        nome: "Vidraceiro",
        descricao: "O Vidraceiro prepara máquinas , equipamentos e instrumentos para corte de vidros. Cortam, e instalam vidros, vitrais e espelhos. temperam vidros e montam vidros temperados. confeccionam, lapidam e pintam vitrais.",
        avaliacao: "blablabla",
    },
];

for (let x = 0; x <servicos.length; x++) {
    await db.run(
        `INSERT INTO servicos (id, img, nome, descricao, avaliacao) VALUES(?,?,?,?,?)`
    ,[
        servicos[x].id, 
        servicos[x].img, 
        servicos[x].nome, 
        servicos[x].descricao, 
        servicos[x].avaliacao]
    )   
}