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
  
    // Envia os dados para o backend
    fetch('/api/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, sobrenome, email, senha }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error); // Exibe mensagem de erro
        } else {
          alert('Usuário cadastrado com sucesso!'); // Exibe mensagem de sucesso
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao cadastrar o usuário. Tente novamente.');
      });
  });