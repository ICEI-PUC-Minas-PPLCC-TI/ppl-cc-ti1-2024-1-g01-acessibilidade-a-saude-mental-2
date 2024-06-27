function loadUserProfile() {
    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            const user = data.Paciente[0];
            document.getElementById('user-photo').src = user.foto;
            document.getElementById('user-name').innerText = user.nome;
            document.getElementById('user-email').innerText = user.email;
            document.getElementById('user-age').innerText = user.idade + ' anos';
            document.getElementById('user-gender').innerText = user.sexo;
            
            const ratingContainer = document.getElementById('user-rating');
                    ratingContainer.innerHTML = ''; // Limpar estrelas atuais
                    const rating = user.avaliacao;
                    for (let i = 1; i <= 5; i++) {
                        const starImg = document.createElement('img');
                        if (rating >= i) {
                            starImg.src = 'star-icon.png';
                        }else if(rating >= i - 0.5) {
                            starImg.src = 'star-half-icon.png';
                        } else {
                            starImg.src = 'star-empty-icon.png';
                        }
                        starImg.alt = 'Star';
                        ratingContainer.appendChild(starImg);
                    }
        })
    .catch(error => console.error('Erro ao carregar dados do JSON:', error));
}
window.onload = loadUserProfile;