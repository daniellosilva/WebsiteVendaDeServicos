window.addEventListener("load", main);

let servicos = [];

async function main(){

    const response = await fetch("http://localhost:5000/api/servicos")
    const dado = await response.json()
    servicos = dado
    renderizaServicos()

    console.log("Renderizando...")
}

function renderizaServicos() {
    const containerServicos = document.getElementsByClassName("section-1-servicos")[0];
    containerServicos.innerHTML = ""; // Limpa o conteúdo antes de renderizar

    for (let x = 0; x < servicos.length; x++) {
        const servico = document.createElement("div");
        servico.className = "servico-item";

        const img = document.createElement("img");
        const nome = document.createElement("p");
        const descricao = document.createElement("p");
        const avaliacao = document.createElement("p");
        const button = document.createElement("button");

        // Preencher os dados
        servico.id = servicos[x].id;
        img.src = servicos[x].img;
        img.alt = servicos[x].nome;
        nome.textContent = servicos[x].nome;
        descricao.textContent = servicos[x].descricao;
        avaliacao.textContent = `Avaliação: ${servicos[x].avaliacao}`;
        button.textContent = "Contratar Serviço";

        // Adicionar evento no botão
        button.addEventListener("click", () => botaoContratarServico(servicos[x].id));

        // Montar a estrutura
        servico.appendChild(img);
        servico.appendChild(nome);
        servico.appendChild(descricao);
        servico.appendChild(avaliacao);
        servico.appendChild(button);

        // Adicionar o serviço ao container
        containerServicos.appendChild(servico);
    }
}

function botaoContratarServico(id) {
    const servicoSelecionado = obterServicoPorId(id);
    if (servicoSelecionado) {
        const mensagem = `Olá, gostaria de contratar o serviço de ${servicoSelecionado.nome}!`;
        const numeroWhatsApp = "558899999999"; // Troque pelo número real
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }
}
