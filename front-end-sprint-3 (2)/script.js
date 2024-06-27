document.addEventListener('DOMContentLoaded', () => {
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    const askQuestionModal = new bootstrap.Modal(document.getElementById('askQuestionModal'));
    const questionForm = document.getElementById('questionForm');
    const questionsContainer = document.getElementById('questionsContainer');

    // Recuperar perguntas do localStorage
    let questions = JSON.parse(localStorage.getItem('questions')) || [];

    // Manipulador para abrir o modal de perguntas
    askQuestionBtn.addEventListener('click', () => {
        askQuestionModal.show();
    });

    // Manipulador de envio de pergunta
    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const questionText = document.getElementById('questionText').value;
        if (questionText.trim()) {
            questions.push({ question: questionText, answer: '' });
            localStorage.setItem('questions', JSON.stringify(questions));
            document.getElementById('questionText').value = '';
            askQuestionModal.hide();
            displayQuestions();
        }
    });

    // Função para exibir perguntas
    function displayQuestions() {
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
    displayQuestions();
});
