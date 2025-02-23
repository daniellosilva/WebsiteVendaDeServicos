window.addEventListener("load", main);

async function main() {
    try {
        const response = await fetch("http://localhost:5000/api/servicos");
        const servicos = await response.json();
        renderizaConteudoInicial(servicos);
        renderizaServicosPopulares(servicos);
    } catch (error) {
        console.error("Erro ao buscar serviços: ", error);
    }
}

function renderizaConteudoInicial(servicos) {
    const section = document.querySelector(".section-1");
    section.innerHTML = "";
    
    const div = document.createElement("div");
    div.className = "posicao-section1";
    
    // Escolhendo uma imagem aleatória a partir dos serviços
    const servicoAleatorio = servicos[Math.floor(Math.random() * servicos.length)];
    
    const img = document.createElement("img");
    img.src = servicoAleatorio.img;
    img.alt = servicoAleatorio.nome;
    img.height = 230;
    
    const p = document.createElement("p");
    p.innerHTML = "Prontos para quebrar o galho e <br>resolver <strong>todos</strong> os problemas do <br>seu lar!";
    
    div.appendChild(img);
    div.appendChild(p);
    section.appendChild(div);
    
    const botaoDiv = document.createElement("div");
    botaoDiv.className = "botao-inicio";
    
    const a = document.createElement("a");
    a.href = "login.html";
    a.textContent = "Comece já!";
    
    botaoDiv.appendChild(a);
    section.appendChild(botaoDiv);
}

function renderizaServicosPopulares(servicos) {
    const container = document.querySelector(".posicao-servicos");
    container.innerHTML = "";
    
    // Pegando os 3 primeiros serviços ou escolhendo aleatoriamente
    const populares = servicos.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    populares.forEach(servico => {
        const div = document.createElement("div");
        
        const img = document.createElement("img");
        img.src = servico.img;
        img.alt = servico.nome;
        img.width = 300;
        img.height = 200;
        
        const p = document.createElement("p");
        p.textContent = servico.nome;
        
        div.appendChild(img);
        div.appendChild(p);
        container.appendChild(div);
    });
}
