document.addEventListener('DOMContentLoaded', function() {
    const seguirBtn = document.getElementById('seguir-btn');

    if (seguirBtn) {
        seguirBtn.addEventListener('click', function() {
            const pacienteRadio = document.getElementById('paciente');
            const profissionalRadio = document.getElementById('profissional');

            if (pacienteRadio.checked) {
                const tipoUsuario = "paciente";
                console.log('Tipo de usuário selecionado:', tipoUsuario);
                window.location.href = 'cadastro.html?tipo=' + tipoUsuario;
            } else if (profissionalRadio.checked) {
                const tipoUsuario = "profissional";
                console.log('Tipo de usuário selecionado:', tipoUsuario);
                window.location.href = 'cadastroprofissional.html?tipo=' + tipoUsuario;
            }
        });
    }

    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        const tipoUsuario = getQueryParam('tipo');
        console.log(`Tipo de usuário na página de cadastro: ${tipoUsuario}`);

        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const fullnameElement = document.getElementById('fullname');
            const emailElement = document.getElementById('email');
            const cpfElement = document.getElementById('cpf');
            const birthdateElement = document.getElementById('birthdate');
            const passwordElement = document.getElementById('password');

            if (fullnameElement && emailElement && cpfElement && birthdateElement && passwordElement) {
                const fullname = fullnameElement.value;
                const email = emailElement.value;
                const cpf = cpfElement.value;
                const birthdate = birthdateElement.value;
                const password = passwordElement.value;

                if (fullname && email && cpf && birthdate && password && email.includes('@')) {
                    const userData = {
                        fullname: fullname,
                        email: email,
                        cpf: cpf,
                        birthdate: birthdate,
                        password: password,
                        tipo: tipoUsuario
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
                                return response.json();
                            } else {
                                throw new Error('Erro ao criar conta. Tente novamente.');
                            }
                        })
                        .then(data => {
                            console.log('Novo usuário criado:', data);
                            window.location.href = 'index.html';
                        })
                        .catch(error => {
                            console.error('Erro:', error.message);
                            alert('Erro ao criar conta. Tente novamente.');
                        });
                } else {
                    alert('Por favor, preencha todos os campos corretamente.');
                }
            } else {
                alert('Por favor, preencha todos os campos corretamente.');
            }
        });
    }

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
                            const user = data[0];
                            if (user.tipo === 'paciente') {
                                window.location.href = 'paciente.html';
                            } else if (user.tipo === 'profissional') {
                                window.location.href = 'profissionalchat.html';
                            }
                        } else {
                            alert('Email ou senha incorretos.');
                        }
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                        alert('Erro ao fazer login. Tente novamente.');
                    });
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
});
