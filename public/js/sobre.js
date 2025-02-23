window.addEventListener("load", carregarSobre);

async function carregarSobre() {
    try {
        const response = await fetch("http://localhost:5000/api/servicos");
        const servicos = await response.json();
        renderizaSobre(servicos);
    } catch (error) {
        console.error("Erro ao buscar serviços: ", error);
    }
}

function renderizaSobre(servicos) {
    const secoes = document.querySelectorAll(".section-1, .section-2, .section-3");
    const textosFixos = [
        "Nós somos o Middo, o seu parceiro confiável para simplificar a rotina e resolver problemas do dia a dia.",
        "Somos uma plataforma dedicada a conectar profissionais qualificados com pessoas que precisam de serviços práticos para o lar. Desde reparos rápidos até soluções completas, nossa missão é garantir que você tenha o suporte certo, na hora certa.",
        "Seja para instalar, consertar ou renovar, o Middo está aqui para ajudar você a transformar sua casa com praticidade e confiança."
    ];

    secoes.forEach((secao, index) => {
        secao.innerHTML = "";
        const div = document.createElement("div");
        
        const servicoAleatorio = servicos[Math.floor(Math.random() * servicos.length)];
        
        const img = document.createElement("img");
        img.src = servicoAleatorio.img;
        img.alt = "Imagem ilustrativa";
        img.height = 220;
        img.width = 330;
        
        const p = document.createElement("p");
        p.textContent = textosFixos[index];
        
        div.appendChild(img);
        div.appendChild(p);
        secao.appendChild(div);
    });
}
