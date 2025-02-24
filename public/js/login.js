document.getElementById('form-login').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos campos
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Validação básica no frontend
    if (!email || !senha) {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    // Envia os dados para o backend
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, senha}),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          alert(data.error); // Exibe mensagem de erro
        } else {
          alert('Usuário logado com sucesso!'); // Exibe mensagem de sucesso
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao logar o usuário. Tente novamente.');
      });
  });