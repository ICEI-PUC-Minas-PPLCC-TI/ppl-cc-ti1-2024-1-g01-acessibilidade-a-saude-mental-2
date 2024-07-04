document.addEventListener('DOMContentLoaded', () => {
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    const askQuestionModalElement = document.getElementById('askQuestionModal');
    const askQuestionModal = new bootstrap.Modal(askQuestionModalElement);
    const questionForm = document.getElementById('questionForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const userLink = document.getElementById('userLink'); // Elemento para link do usuário

    const API_URL = '/questions'; // URL do seu JSON server

    // Recuperar perguntas do JSON server
    async function fetchQuestions() {
        try {
            const response = await fetch(API_URL);
            const questions = await response.json();
            displayQuestions(questions);
        } catch (error) {
            console.error('Erro ao buscar perguntas:', error);
        }
    }

    // Manipulador para abrir o modal de perguntas
    if (askQuestionBtn) {
        askQuestionBtn.addEventListener('click', () => {
            askQuestionModal.show();
        });
    }

    // Manipulador de envio de pergunta
    if (questionForm) {
        questionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const questionText = document.getElementById('questionText').value;
            if (questionText.trim()) {
                const newQuestion = { question: questionText, answer: '' };
                try {
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newQuestion)
                    });
                    if (response.ok) {
                        document.getElementById('questionText').value = '';
                        askQuestionModal.hide();
                        fetchQuestions();
                    } else {
                        console.error('Erro ao enviar pergunta:', response.statusText);
                    }
                } catch (error) {
                    console.error('Erro ao enviar pergunta:', error);
                }
            }
        });
    }

    // Redirecionar para a página do usuário ao clicar no ícone
    if (userLink) {
        userLink.addEventListener('click', (e) => {
            // Lógica para redirecionar para a página do usuário
            console.log('Redirecionando para a página do usuário...');
            // Por exemplo:
            // window.location.href = userLink.href;
        });
    }

    // Função para exibir perguntas
    function displayQuestions(questions) {
        questionsContainer.innerHTML = '';
        questions.forEach((q, index) => {
            const questionCard = document.createElement('div');
            questionCard.className = 'card my-3';
            questionCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Pergunta ${index + 1}</h5>
                    <p class="card-text">${q.question}</p>
                    <p class="card-text text-muted">Resposta: ${q.answer || 'Ainda não respondida'}</p>
                </div>
            `;
            questionsContainer.appendChild(questionCard);
        });
    }

    // Exibir perguntas na inicialização
    fetchQuestions();
});