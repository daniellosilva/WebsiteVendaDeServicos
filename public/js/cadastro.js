document.getElementById('form-cadastro').addEventListener('submit', function (event) {
  event.preventDefault(); 

  const nome = document.getElementById('nome').value.trim();
  const sobrenome = document.getElementById('sobrenome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const senha2 = document.getElementById('senha2').value.trim();

  if (!nome || !sobrenome || !email || !senha || !senha2) {
    alert('Todos os campos são obrigatórios.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  if (senha !== senha2) {
    alert('As senhas não coincidem.');
    return;
  }

  fetch('/api/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, sobrenome, email, senha }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        alert(data.error); 
      } else {
        alert('Usuário cadastrado com sucesso!'); 
        document.getElementById("cadastro-sucesso").style.display = "flex";
        setTimeout(() =>  {
          window.location.href = "index.html";
        }, 2000);
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao cadastrar o usuário. Tente novamente.');
    });
});