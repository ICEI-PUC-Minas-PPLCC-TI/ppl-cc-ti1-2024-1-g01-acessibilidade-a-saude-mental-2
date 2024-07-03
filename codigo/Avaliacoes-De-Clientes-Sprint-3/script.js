document.addEventListener('DOMContentLoaded', function() {
    const avaliarBtn = document.getElementById('avaliar-btn');
    if (avaliarBtn) {
        avaliarBtn.addEventListener('click', function() {
            window.location.href = 'review.html';
        });
    }

    const confirmarBtn = document.getElementById('confirmar-avaliacao-btn');
    if (confirmarBtn) {
        confirmarBtn.addEventListener('click', function() {
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const experience = document.getElementById('experience').value;

            const review = {
                user: 'Usuário Anônimo', 
                comment: experience,
                rating: parseInt(rating)
            };

            const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
            storedReviews.push(review);
            localStorage.setItem('reviews', JSON.stringify(storedReviews));

            alert('Avaliação enviada com sucesso!');
            window.location.href = 'index.html';
        });
    }
});
