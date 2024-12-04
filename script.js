// Alterna entre as seções de login e cadastro
document.getElementById('showCadastro').addEventListener('click', function() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('cadastroSection').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('cadastroSection').style.display = 'none';
});

// Manipulando o evento de envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Obtém os dados do formulário de login
    const username = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    // Envia uma requisição AJAX para o login
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login realizado com sucesso!');
        } else {
            alert('Login falhou: ' + data.message);
        }
    });
});

// Manipulando o evento de envio do formulário de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Obtém os dados do formulário de cadastro
    const username = document.getElementById('cadastroEmail').value;
    const senha = document.getElementById('cadastroSenha').value;

    // Envia uma requisição AJAX para o cadastro
    fetch('/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cadastro realizado com sucesso!');
            document.getElementById('showLogin').click(); // Retorna para a tela de login automaticamente
        } else {
            alert('Cadastro falhou: ' + data.message);
        }
    });
});
