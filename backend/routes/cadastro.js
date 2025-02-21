document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();  // Impede o envio do formulário padrão
    
    const formData = new FormData(form);
    const usuario = {};
    
    formData.forEach((value, key) => {
      usuario[key] = value;
    });
    
    try {
      const response = await fetch('http://localhost:5000/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      const data = await response.json();
      
      if (response.status === 201) {
        alert(data.message);  // Usuário cadastrado com sucesso
        window.location.href = 'login.html';  // Redireciona para a página de login
      } else {
        alert(data.error);  // Exibe o erro
      }
    } catch (err) {
      alert("Erro ao enviar dados. Tente novamente.");
    }
  });
});
