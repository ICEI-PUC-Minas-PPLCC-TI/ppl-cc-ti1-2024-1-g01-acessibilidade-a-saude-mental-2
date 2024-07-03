document.addEventListener('DOMContentLoaded', () => {
    const adminQuestionsContainer = document.getElementById('adminQuestionsContainer');
    const API_URL = 'http://localhost:3000/questions'; // URL do seu JSON server

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

    // Função para exibir perguntas
    function displayQuestions(questions) {
        adminQuestionsContainer.innerHTML = '';
        questions.forEach((q, index) => {
            const questionCard = document.createElement('div');
            questionCard.className = 'card my-3';
            questionCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Pergunta ${index + 1}</h5>
                    <p class="card-text">${q.question}</p>
                    <textarea class="form-control my-3" id="answerText${index}" placeholder="Escreva sua resposta aqui...">${q.answer}</textarea>
                    <button class="btn btn-primary" onclick="submitAnswer(${q.id}, ${index})">Enviar Resposta</button>
                </div>
            `;
            adminQuestionsContainer.appendChild(questionCard);
        });
    }

    // Função para enviar a resposta
    window.submitAnswer = async (id, index) => {
        const answerText = document.getElementById(`answerText${index}`).value;
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answer: answerText })
            });
            if (response.ok) {
                fetchQuestions();
            } else {
                console.error('Erro ao enviar resposta:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar resposta:', error);
        }
    }

    // Exibir perguntas na inicialização
    fetchQuestions();
});
