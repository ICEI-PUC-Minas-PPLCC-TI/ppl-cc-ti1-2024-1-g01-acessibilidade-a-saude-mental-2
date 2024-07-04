function loadUserProfile(cpf) {
    fetch('/paciente')
        .then(response => response.json())
        .then(data => {
            const user = data.find(paciente => paciente.cpf == cpf);
            if (user) {
                document.getElementById('user-photo').src = "assets/imagens/" + user.foto;
                document.getElementById('user-name').innerText = user.nome;
                document.getElementById('user-email').innerText = user.email;
                document.getElementById('user-age').innerText = user.idade + ' anos';
                document.getElementById('user-gender').innerText = user.sexo;

                const ratingContainer = document.getElementById('user-rating');
                ratingContainer.innerHTML = '';
                const rating = user.avaliacao;
                for (let i = 1; i <= 5; i++) {
                    const starImg = document.createElement('img');
                    if (rating >= i) {
                        starImg.src = 'assets/imagens/star-icon.png';
                    } else if (rating >= i - 0.5) {
                        starImg.src = 'assets/imagens/star-half-icon.png';
                    } else {
                        starImg.src = 'assets/imagens/star-empty-icon.png';
                    }
                    starImg.alt = 'Star';
                    ratingContainer.appendChild(starImg);
                }
            } else {
                console.error('Paciente não encontrado');
            }
        })
        .catch(error => console.error('Erro ao carregar dados do JSON:', error));
}

window.onload = function() {
    const cpf = 22222222222; // Substitua pelo CPF desejado
    loadUserProfile(cpf);
};
