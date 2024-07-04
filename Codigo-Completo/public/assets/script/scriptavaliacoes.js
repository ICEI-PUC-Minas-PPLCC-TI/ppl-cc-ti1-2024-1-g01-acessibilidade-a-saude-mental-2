document.addEventListener('DOMContentLoaded', function() {
    // Adiciona evento ao botão de avaliar, redirecionando para a página de avaliação
    const avaliarBtn = document.getElementById('avaliar-btn');
    if (avaliarBtn) {
        avaliarBtn.addEventListener('click', function() {
            window.location.href = 'review.html';
        });
    }

    const voltarBtn = document.getElementById('voltar-btn');
    if (voltarBtn) {
        voltarBtn.addEventListener('click', function() {
            window.location.href = 'paciente.html';
        });
    }

    // Adiciona evento ao botão de confirmar avaliação, salvando a avaliação e redirecionando para a página inicial
    const confirmarBtn = document.getElementById('confirmar-avaliacao-btn');
    if (confirmarBtn) {
        confirmarBtn.addEventListener('click', function() {
            // Obtém os valores da avaliação e comentário do usuário
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const experience = document.getElementById('experience').value;

            // Cria um objeto de avaliação com os dados fornecidos pelo usuário
            const review = {
                user: 'Usuário Anônimo', 
                comment: experience,
                rating: parseInt(rating)
            };

            // Obtém as avaliações armazenadas no localStorage ou cria uma lista vazia
            const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
            // Adiciona a nova avaliação à lista
            storedReviews.push(review);
            // Armazena a lista de avaliações atualizada no localStorage
            localStorage.setItem('reviews', JSON.stringify(storedReviews));

            // Exibe uma mensagem de sucesso e redireciona para a página inicial
            alert('Avaliação enviada com sucesso!');
            window.location.href = 'index.html';
        });
    }

    // Obtém as avaliações armazenadas no localStorage
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    // Seleciona o contêiner onde as avaliações serão exibidas
    const container = document.querySelector('.container1');

    // Para cada avaliação armazenada, cria elementos HTML para exibi-la
    storedReviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');

        const userIcon = document.createElement('div');
        userIcon.classList.add('user-icon');
        userIcon.textContent = review.user.charAt(0); // Primeira letra do nome do usuário

        const reviewContent = document.createElement('div');
        reviewContent.classList.add('review-content');

        const userName = document.createElement('h5');
        userName.textContent = review.user;

        const comment = document.createElement('p');
        comment.textContent = review.comment;

        const starRating = document.createElement('div');
        starRating.classList.add('star-rating');
        starRating.textContent = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating); // Cria a classificação em estrelas

        // Adiciona os elementos de conteúdo da avaliação ao contêiner de conteúdo
        reviewContent.appendChild(userName);
        reviewContent.appendChild(comment);
        reviewContent.appendChild(starRating);

        // Adiciona o ícone do usuário e o contêiner de conteúdo ao contêiner da avaliação
        reviewDiv.appendChild(userIcon);
        reviewDiv.appendChild(reviewContent);

        // Insere a nova avaliação antes do botão de avaliar
        container.insertBefore(reviewDiv, container.querySelector('.button-container'));
    });
});
