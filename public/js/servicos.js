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
    const servicos = document.getElementsByClassName("servicos"[0]);
    for (let x = 0; x < servicos.length;x++){ // Talvez dê erro por causa do "servicos" que se repete 
        const servico = document.createElement("div"); // Tem que dar uma olhada
        const img = document.createElement("img");
        const nome = document.createElement("p"); // Tem que dar uma olhada nesse "p"
        
        const descricao = document.createElement("p");
        const avaliacao = document.createElement("p");
        const valor = document.createElement("p");

        const button = document.createElement("button"); // Recurso novo, botão de contato do serviço

        
        servico.id = servicos[x].id; // acredito que vá puxar o serviço.id da lista de serviços

        img.src = servicos[x].img;
        nome.textContent = servicos[x].nome;
        descricao.textContent = servicos[x].descricao;
        avaliacao.textContent = `Avaliação: ${servicos[x].avaliacao}`;
        valor.textContent = `R$ ${servicos[x].valor}`;

        button.textContent = "Contratar Serviço";

        button.addEventListener("click", botaoContratarServico);

        servico.appendChild(img);
        servico.appendChild(nome);
        servico.appendChild(descricao);
        servico.appendChild(avaliacao);
        servico.appendChild(valor);
        servico.appendChild(button);

        servicos.appendChild(servico);
    }
}

function botaoContratarServico(evento){
    //uma função que redirecione para o whatsapp
}

function obterServicoPorId(id){
    for (let servico of servicos){
        if(servico.id === id){
            return servico;
        }
    }
    return null;
}