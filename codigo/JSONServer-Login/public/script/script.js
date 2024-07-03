// Função auxiliar para adicionar event listeners apenas se o elemento existir
function addEventListenerIfExists(elementId, event, handler) {
    var element = document.getElementById(elementId);
    if (element) {
        element.addEventListener(event, handler);
    }
}

// TELA DE SELEÇÃO DE USUÁRIO
document.addEventListener('DOMContentLoaded', function() {
    addEventListenerIfExists('seguir-btn', 'click', function() {
        var pacienteRadio = document.getElementById('paciente');
        var profissionalRadio = document.getElementById('profissional');

        if (pacienteRadio.checked) {
            window.location.href = 'cadastro.html';
        } else if (profissionalRadio.checked) {
            window.location.href = 'naoéminhaparte.html';
        } else {
            alert('Por favor, selecione o tipo de usuário.');
        }
    });
});

// TELA DE CADASTRO
document.addEventListener('DOMContentLoaded', function() {
    addEventListenerIfExists('criar-conta-btn', 'click', function(event) {
        event.preventDefault(); 

        var fullname = document.getElementById('fullname').value;
        var email = document.getElementById('email').value;
        var cpf = document.getElementById('cpf').value;
        var birthdate = document.getElementById('birthdate').value;
        var password = document.getElementById('password').value;

        // Ver se tá tudo preenchido
        if (fullname.trim() === '' || email.trim() === '' || cpf.trim() === '' || birthdate.trim() === '' || password.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return; 
        }
        // Ver se o email tá com @
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

        // Salvar os dados no localStorage temporariamente para o exemplo
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = 'aviso.html';
    });
});

// TELA DE AVISO PARA O QUESTIONÁRIO
document.addEventListener('DOMContentLoaded', function() {
    addEventListenerIfExists('seguirquest-btn', 'click', function() {
        window.location.href = 'questionario.html';
    });
});

// TELA DO QUESTIONÁRIO
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('questionnaire-form');
    if (form) {
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

            // Salvar os dados no localStorage temporariamente para o exemplo
            localStorage.setItem('questionnaireData', JSON.stringify(questionnaireData));
            window.location.href = 'nãoéminhaparte.html';
        });
    }
});

// TELA DE LOGIN
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            // Verificar se os dados de login correspondem aos dados armazenados
            var storedUserData = JSON.parse(localStorage.getItem('userData'));
            if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
                window.location.href = 'nãoéminhaparte.html';
            } else {
                alert('É necessário realizar um cadastro.');
            }
        });
    }
});
