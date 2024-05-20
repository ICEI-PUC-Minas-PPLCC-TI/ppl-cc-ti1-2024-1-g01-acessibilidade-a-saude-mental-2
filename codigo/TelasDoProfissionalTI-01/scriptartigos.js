document.addEventListener('DOMContentLoaded', function() {
    const artigosList = document.getElementById('artigos-list');

    // Faça uma solicitação para carregar o arquivo JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Itera sobre os objetos do JSON e cria os links dinamicamente
            data.artigos.forEach(artigo => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.textContent = artigo.titulo;
                link.href = `artigos/${artigo.nome}`; // Define o href como o caminho para o arquivo PDF
                link.setAttribute('target', '_blank');

                // Estilo dos links
                link.style.color = '#00b300';
                link.style.textDecoration = 'none';
            

                
                link.addEventListener('mouseenter', function() {
                    link.style.color = '#007d00'; // Cor do link ao passar o mouse
                });

                link.addEventListener('mouseleave', function() {
                    link.style.color = '#00b300'; // Cor do link ao retirar o mouse
                });

                listItem.appendChild(link);
                artigosList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados do arquivo JSON:', error);
        });
});
