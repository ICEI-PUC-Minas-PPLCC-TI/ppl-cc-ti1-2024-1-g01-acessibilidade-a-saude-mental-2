// Função para redirecionar para a página de criação de artigo
function criarNovoArtigo() {
    window.location.href = 'criar_artigo.html';
}

// Função para carregar artigos do servidor
function loadArticles() {
    fetch('/articles')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar artigos');
            }
            return response.json();
        })
        .then(data => {
            const articlesContainer = document.getElementById('articles');
            articlesContainer.innerHTML = '';
            data.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.className = 'article';
                articleElement.innerHTML = `<h2>${article.title}</h2><p>${article.content}</p>`;
                articlesContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Erro ao carregar artigos:', error));
}

// Carregar os artigos ao carregar a página
document.addEventListener('DOMContentLoaded', loadArticles);

// Função para salvar um novo artigo
function salvarArtigo(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const article = { title, content };

    fetch('/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar artigo');
        }
        return response.json();
    })
    .then(data => {
        console.log('Artigo salvo com sucesso:', data);
        window.location.href = 'index.html'; // Redirecionar para a página index.html após salvar o artigo
    })
    .catch(error => console.error('Erro ao salvar artigo:', error));
}

// Adicionar evento de submit para o formulário de artigo, se existir
const articleForm = document.getElementById('articleForm');
if (articleForm) {
    articleForm.addEventListener('submit', salvarArtigo);
}
