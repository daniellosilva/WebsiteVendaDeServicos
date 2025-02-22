document.getElementById('form-cadastro').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    // Captura os valores dos campos
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senha2 = document.getElementById('senha2').value;
  
    // Validação básica no frontend
    if (!nome || !sobrenome || !email || !senha || !senha2) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
  
    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
  
    // Validação de senha
    if (senha !== senha2) {
      alert('As senhas não coincidem.');
      return;
    }
  
    // Cria o objeto com os dados do formulário
    const dados = {
      nome,
      sobrenome,
      email,
      senha,
    };
  
    // Envia os dados para o backend
    fetch('http://localhost:5000/api/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message); // Exibe mensagem de sucesso
          window.location.href = 'login.html'; // Redireciona para a página de login
        } else if (data.error) {
          alert(data.error); // Exibe mensagem de erro
        }
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao conectar com o servidor.');
      });
  });