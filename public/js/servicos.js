window.addEventListener("load", main);

let servicos = [];

async function main() {
    const response = await fetch("http://localhost:5000/api/servicos");
    const dado = await response.json();
    servicos = dado;
    renderizaServicos();
}

function renderizaServicos() {
    const containerServicos = document.getElementsByClassName("posicao-servicos")[0];
    containerServicos.innerHTML = "";

    for (let x = 0; x < servicos.length; x++) {
        const servico = document.createElement("div");
        servico.className = "servico-item";

        const img = document.createElement("img");
        const nome = document.createElement("h2");
        const button = document.createElement("button");

        // Preencher os dados
        img.src = servicos[x].img;
        img.alt = servicos[x].nome;
        nome.textContent = servicos[x].nome;
        button.textContent = "Saiba Mais";

        // Evento para abrir o modal
        button.addEventListener("click", () => abrirModal(servicos[x]));

        // Montar a estrutura
        servico.appendChild(img);
        servico.appendChild(nome);
        servico.appendChild(button);
        containerServicos.appendChild(servico);
    }
}

function abrirModal(servico) {
    const modal = document.createElement("div");
    modal.id = "modal-servico";
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${servico.img}" alt="${servico.nome}">
            <h2>${servico.nome}</h2>
            <p>${servico.descricao}</p>
            <p>Avaliação: ${servico.avaliacao}</p>
            <button id="modal-contratar">Contratar Serviço</button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = "flex";

    // Fechar modal
    modal.querySelector(".close").onclick = () => modal.remove();
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };

    // Botão de contato
    document.getElementById("modal-contratar").onclick = () => {
        const mensagem = `Olá, gostaria de contratar o serviço de ${servico.nome}!`;
        const numeroWhatsApp = "558899999999";
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    };
}
