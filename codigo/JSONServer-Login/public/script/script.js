// Redirecionamento baseado na seleção do usuário em seleção.html
document.addEventListener('DOMContentLoaded', function() {
    const seguirBtn = document.getElementById('seguir-btn');

    if (seguirBtn) {
        seguirBtn.addEventListener('click', function() {
            const pacienteRadio = document.getElementById('paciente');
            const profissionalRadio = document.getElementById('profissional');

            if (pacienteRadio.checked) {
                window.location.href = 'cadastro.html';
            } else if (profissionalRadio.checked) {
                window.location.href = 'henrique.html';
            }
        });
    }

    // Lida com o envio do formulário de cadastro em cadastro.html
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const cpf = document.getElementById('cpf').value;
            const birthdate = document.getElementById('birthdate').value;
            const password = document.getElementById('password').value;

            if (fullname && email && cpf && birthdate && password && email.includes('@')) {
                const userData = {
                    fullname: fullname,
                    email: email,
                    cpf: cpf,
                    birthdate: birthdate,
                    password: password
                };

                fetch('/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                .then(response => {
                    if (response.ok) {
                        window.location.href = 'index.html';
                    } else {
                        alert('Erro ao criar conta. Tente novamente.');
                    }
                });
            } else {
                alert('Por favor, preencha todos os campos corretamente.');
            }
        });
    }

    // Lida com o envio do formulário de login em index.html
    const loginForm = document.querySelector('form[action=""]');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = loginForm.querySelector('input[name="email"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;

            if (email && password) {
                fetch(`/users?email=${email}&password=${password}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        window.location.href = 'enzo.html';
                    } else {
                        alert('Email ou senha incorretos.');
                    }
                });
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
});
