document.getElementById('form-cadastro').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    // Captura os valores dos campos
    const nome = document.getElementById('nome').value.trim;
    const sobrenome = document.getElementById('sobrenome').value.trim;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value.trim;
    const senha2 = document.getElementById('senha2').value.trim;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação básica no frontend
    if (!nome || !sobrenome || !email || !senha || !senha2) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
  
    // Validação de e-mail
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
        .then(response => {
          if (!response.ok) {
            alert('Error')
            throw new Error(`Erro: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Usuário cadastrado com sucesso:', data);
        })
        .catch(error => {
          console.error('Erro ao cadastrar usuário:', error);
        });
      
  });