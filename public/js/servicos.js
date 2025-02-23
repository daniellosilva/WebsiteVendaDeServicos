window.addEventListener("load", main);

let servicos = [];

async function main(){

    const response = await fetch("http://localhost:5000/api/servicos")
    const dado = await response.json()
    servicos = dado
    renderizaServicos()

    console.log("Renderizando...")
}

function renderizaServicos(){
    const servicosContainer = document.getElementsByClassName("servicos")[0];
    if (servicosContainer) {
        for (let x = 0; x < servicos.length; x++) {
            const servico = document.createElement("div");
            servico.classList.add("servico");
    
            const img = document.createElement("img");
            const nome = document.createElement("p");
            const descricao = document.createElement("p");
            const avaliacao = document.createElement("p");
            const button = document.createElement("button");
    
            servico.id = servicos[x].id;
            img.src = servicos[x].img;
            nome.textContent = servicos[x].nome;
            descricao.textContent = servicos[x].descricao;
            avaliacao.textContent = `Avaliação: ${servicos[x].avaliacao}`;
            button.textContent = "Contratar Serviço";

            button.addEventListener("click", botaoContratarServico);

            servico.appendChild(img);
            servico.appendChild(nome);
            servico.appendChild(descricao);
            servico.appendChild(avaliacao);
            servico.appendChild(button);

    
            servicosContainer.appendChild(servico);


        }
    }
}

function botaoContratarServico(evento) {
    const idServico = evento.target.parentElement.id;
    const servico = obterServicoPorId(idServico);
    if (servico) {
        const mensagem = encodeURIComponent(`Olá, quero contratar o serviço de ${servico.nome}.`);
        window.open(`https://wa.me/5599999999999?text=${mensagem}`, "_blank");
    }
}

function obterServicoPorId(id){
    for (let servico of servicos){
        if(servico.id === id){
            return servico;
        }
    }
    return null;
}