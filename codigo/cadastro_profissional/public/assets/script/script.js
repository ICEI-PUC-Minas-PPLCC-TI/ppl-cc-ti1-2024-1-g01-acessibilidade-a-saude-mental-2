//TELA DE SELEÇÃO DE USUÁRIO
document.addEventListener('DOMContentLoaded', function() {
    var seguirBtn = document.getElementById('seguir-btn');

    seguirBtn.addEventListener('click', function() {
        var pacienteRadio = document.getElementById('paciente');
        var profissionalRadio = document.getElementById('profissional');

        if (pacienteRadio.checked) {
            window.location.href = 'cadastro.html';
        } else if (profissionalRadio.checked) {
            window.location.href = 'cadastroprofissional.html';
        } else {
            alert('Por favor, selecione o tipo de usuário.');
        }
    });
});
//TELA DE SELEÇÃO DE USUÁRIO

//TELA DE CADASTRO
document.addEventListener('DOMContentLoaded', function() {
        var form = document.getElementById('register-form');
        var criarContaBtn = document.getElementById('criar-conta-btn');

        criarContaBtn.addEventListener('click', function(event) {
            event.preventDefault(); 

            var fullname = document.getElementById('fullname').value;
            var email = document.getElementById('email').value;
            var cpf = document.getElementById('cpf').value;
            var birthdate = document.getElementById('birthdate').value;
            var password = document.getElementById('password').value;
            //ver se ta tudo preenchido
            if (fullname.trim() === '' || email.trim() === '' || cpf.trim() === '' || birthdate.trim() === '' || password.trim() === '') {
              alert('Por favor, preencha todos os campos.');
                return; 
            }
            //ver se o email ta com @
            if (!email.includes('@')) {
              alert('Por favor, insira um email válido.');
                return; 
            }

            var userData = {
                fullname: fullname,
                email: email,
                cpf: cpf,
                birthdate: birthdate,
                password: password
            };

            localStorage.setItem('userData', JSON.stringify(userData));

            window.location.href = 'aviso.html';
        });
    });
//TELA DE CADASTRO

//TELA DE AVISO PARA O QUESTIONÁRIO
document.addEventListener('DOMContentLoaded', function() {
    var seguirBtn = document.getElementById('seguirquest-btn');

    seguirBtn.addEventListener('click', function() {
        window.location.href = 'questionario.html';
    });
});
//TELA DE AVISO PARA O QUESTIONÁRIO

//TELA DO QUESTIONÁRIO
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('questionnaire-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        var session = document.getElementById('session').value;
        var reason = document.getElementById('reason').value;
        var therapy = document.getElementById('therapy').value;
        var medication = document.getElementById('medication').value;

        var questionnaireData = {
            session: session,
            reason: reason,
            therapy: therapy,
            medication: medication
        };

        localStorage.setItem('questionnaireData', JSON.stringify(questionnaireData));

        window.location.href = 'cadastroprofissional.html';
    });
});
//TELA DO QUESTIONÁRIO

//TELA DE LOGIN
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Verificar se os dados de login correspondem aos dados armazenados
        var storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
            window.location.href = 'cadastroprofissional.html';
        } else {
            alert('É necessário realizar um cadastro.');
        }
    });
});
//TELA DE LOGIN