document.addEventListener('DOMContentLoaded', () => {
    const adminQuestionsContainer = document.getElementById('adminQuestionsContainer');
    const answerQuestionModal = new bootstrap.Modal(document.getElementById('answerQuestionModal'));
    const answerForm = document.getElementById('answerForm');
    let currentQuestionIndex = null;

    let questions = JSON.parse(localStorage.getItem('questions')) || [];

    function displayAdminQuestions() {
        adminQuestionsContainer.innerHTML = '';
        questions.forEach((q, index) => {
            const questionCard = document.createElement('div');
            questionCard.className = 'card my-3';
            questionCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Pergunta ${index + 1}</h5>
                    <p class="card-text">${q.question}</p>
                    <p class="card-text text-muted">Resposta: ${q.answer || 'Ainda não respondida'}</p>
                    ${q.answer ? '' : `<button class="btn btn-primary" onclick="openAnswerModal(${index})">Responder</button>`}
                </div>
            `;
            adminQuestionsContainer.appendChild(questionCard);
        });
    }

    window.openAnswerModal = function(index) {
        currentQuestionIndex = index;
        answerQuestionModal.show();
    }

    answerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const answerText = document.getElementById('answerText').value;
        if (answerText.trim()) {
            questions[currentQuestionIndex].answer = answerText;
            localStorage.setItem('questions', JSON.stringify(questions));
            document.getElementById('answerText').value = '';
            answerQuestionModal.hide();
            displayAdminQuestions();
        } else {
            alert('A resposta não pode estar vazia.');
        }
    });

    displayAdminQuestions();
});
