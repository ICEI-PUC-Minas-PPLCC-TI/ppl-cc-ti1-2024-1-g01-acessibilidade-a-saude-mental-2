document.addEventListener("DOMContentLoaded", function() {
    let userLocation = [-43.93636424, -19.93265421]; // Coordenadas padrão

    // Tenta obter a localização do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLocation = [position.coords.longitude, position.coords.latitude];
        });
    }

    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            window.psicologosData = data.psicologos;
            displayPsychologists(data.psicologos);
        });

    function displayPsychologists(psicologos) {
        const list = document.getElementById('psychologist-list');
        list.innerHTML = '';

        psicologos.forEach(psicologo => {
            const div = document.createElement('div');
            div.className = 'psychologist';
            div.innerHTML = `
                <div class="profile">
                    <img src="images/${psicologo.foto}" alt="Foto do Psicólogo class="foto" ">
                    <div>
                        <h3>${psicologo.nome}</h3>
                        <div class="rating">${getRatingStars(psicologo.avaliacao)}</div>
                        <p>${psicologo.descricao}</p>
                        <p><strong>Preço:</strong> R$${psicologo.precoconsulta}</p>
                        <p><strong>Especialidades:</strong> ${psicologo.especialidade.join(', ')}</p>
                        <p><strong>Modalidades:</strong> ${psicologo.modalidade.join(', ')}</p>
                        <button class="contact-button">
                            <img style="border-radius: 0%;max-width: 80px;" src="images/chat-icon.png" alt="Chat">
                        </button>
                    </div>
                </div>
            `;
            list.appendChild(div);
        });
    }

    function getRatingStars(rating) {
        let fullStars = Math.floor(rating);
        let halfStars = Math.ceil(rating - fullStars);
        let emptyStars = 5 - fullStars - halfStars;
        return (
            '<img style="border-radius: 0%;max-width: 40px;" src="images/star-icon.png" alt="Estrela cheia">'.repeat(fullStars) +
            '<img style="border-radius: 0%;max-width: 40px;" src="images/star-half-icon.png" alt="Meia estrela">'.repeat(halfStars) +
            '<img style="border-radius: 0%;max-width: 40px;" src="images/star-empty-icon.png" alt="Estrela vazia">'.repeat(emptyStars)
        );
    }

    function calculateDistance(coord1, coord2) {
        const toRad = x => x * Math.PI / 180;
        const R = 6371;
        const dLat = toRad(coord2[1] - coord1[1]);
        const dLon = toRad(coord2[0] - coord1[0]);
        const lat1 = toRad(coord1[1]);
        const lat2 = toRad(coord2[1]);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return R * c;
    }

    window.searchPsychologists = function() {
        const search = document.getElementById('search').value.toLowerCase();
        const precoMin = parseInt(document.getElementById('preco-min').value) || 0;
        const precoMax = parseInt(document.getElementById('preco-max').value) || Infinity;
        const avaliacaoMin = parseFloat(document.getElementById('avaliacao-min').value) || 0;
        const modalidades = Array.from(document.querySelectorAll('input[name="modalidade"]:checked')).map(cb => cb.value);
        const especialidade = document.getElementById('especialidade').value;
        const ordenarPor = document.getElementById('ordenar-por').value;
        let distanciaMax = parseInt(document.getElementById('distancia').value) || Infinity;

        if (!modalidades.includes("Presencial")) {
            distanciaMax = Infinity;
        }

        let filtered = window.psicologosData.filter(psicologo => {
            const matchSearch = psicologo.nome.toLowerCase().includes(search) || psicologo.descricao.toLowerCase().includes(search);
            const matchPreco = psicologo.precoconsulta >= precoMin && psicologo.precoconsulta <= precoMax;
            const matchAvaliacao = psicologo.avaliacao >= avaliacaoMin;
            const matchModalidade = modalidades.length === 0 || modalidades.some(mod => psicologo.modalidade.includes(mod));
            const matchEspecialidade = especialidade === "" || psicologo.especialidade.includes(especialidade);
            const distancia = calculateDistance(userLocation, psicologo.localizacao);
            const matchDistancia = distancia <= distanciaMax;

            return matchSearch && matchPreco && matchAvaliacao && matchModalidade && matchEspecialidade && matchDistancia;
        });

        if (ordenarPor === 'rating') {
            filtered.sort((a, b) => b.avaliacao - a.avaliacao);
        } else if (ordenarPor === 'distance') {
            filtered.sort((a, b) => calculateDistance(userLocation, a.localizacao) - calculateDistance(userLocation, b.localizacao));
        } else if (ordenarPor === 'price') {
            filtered.sort((a, b) => a.precoconsulta - b.precoconsulta);
        }

        displayPsychologists(filtered);
    }

    document.getElementById('presencial').addEventListener('change', function() {
        const distanciaGroup = document.getElementById('distancia-group');
        if (this.checked) {
            distanciaGroup.style.display = 'block';
        } else {
            distanciaGroup.style.display = 'none';
        }
    });

    document.getElementById('avaliacao-min').addEventListener('input', function() {
        const avaliacaoValue = document.querySelector('.avaliacao-value');
        avaliacaoValue.textContent = this.value;
    });
});
