// script.js

function criarNovoArtigo() {
    window.location.href = 'criar_artigo.html';
}

function loadArticles() {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = '';
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = `<h2>${article.title}</h2><p>${article.content}</p>`;
        articlesContainer.appendChild(articleElement);
    });
}

document.addEventListener('DOMContentLoaded', loadArticles);

function salvarArtigo(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const article = { title, content };

    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));

    // Redirecionar para a página index.html após salvar o artigo
    window.location.href = 'index.html';
}

if (document.getElementById('articleForm')) {
    document.getElementById('articleForm').addEventListener('submit', salvarArtigo);
}
