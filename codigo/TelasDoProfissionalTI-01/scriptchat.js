// Função para carregar as mensagens do cliente selecionado
function carregarMensagensCliente(clienteId) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const cliente = data.clientes.find(cliente => cliente.id === clienteId);
            if (cliente) {
                const mensagens = cliente.mensagens || [];
                exibirMensagens(mensagens);
            } else {
                console.log('Cliente não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar mensagens:', error);
        });
}

// Função para exibir as mensagens na área de chat
function exibirMensagens(mensagens) {
    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML = '';

    mensagens.forEach(mensagem => {
        const mensagemDiv = document.createElement('div');
        mensagemDiv.textContent = mensagem.texto;
        mensagemDiv.classList.add('message');

        if (mensagem.tipo === 'cliente') {
            mensagemDiv.classList.add('from-other');
        } else if (mensagem.tipo === 'usuario') {
            mensagemDiv.classList.add('from-user');
        }

        chatArea.appendChild(mensagemDiv);
    });
}

// Função para criar a lista de clientes
function criarListaClientes(clientes) {
    const clientesList = document.getElementById('clientes-list');

    clientes.forEach(cliente => {
        const clienteItem = document.createElement('li');
        clienteItem.innerHTML = `
            <a href="#" class="d-flex align-items-center">
                <img src="${cliente.foto}" alt="${cliente.nome}" class="avatar">
                <span class="text">${cliente.nome}</span>
            </a>
        `;
        clienteItem.addEventListener('click', () => {
            carregarMensagensCliente(cliente.id);
        });
        clientesList.appendChild(clienteItem);
    });
}

// Inicialização: Carregar lista de clientes
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const clientes = data.clientes;
        criarListaClientes(clientes);
    })
    .catch(error => {
        console.error('Erro ao carregar clientes:', error);
    });

    function enviarMensagem(mensagem) {
        let data = JSON.parse(localStorage.getItem('data'));
        if (!data) {
            console.error('Dados não encontrados no localStorage');
            return;
        }
    
        const clienteId = localStorage.getItem('clienteSelecionado');
        const clienteIndex = data.clientes.findIndex(cliente => cliente.id === parseInt(clienteId));
        if (clienteIndex !== -1) {
            // Adiciona a nova mensagem ao array de mensagens do cliente
            data.clientes[clienteIndex].mensagens.push({ texto: mensagem, tipo: 'usuario' });
            
            // Atualiza os dados no localStorage
            localStorage.setItem('data', JSON.stringify(data));
    
            // Atualiza a exibição das mensagens no chat
            exibirMensagens(data.clientes[clienteIndex].mensagens);
        } else {
            console.log('Cliente não encontrado.');
        }
    }



// Função para enviar mensagens
function enviarMensagem(mensagem) {
    let data = JSON.parse(localStorage.getItem('data'));
    if (!data) {
        console.error('Dados não encontrados no localStorage');
        return;
    }

    const clienteId = localStorage.getItem('clienteSelecionado');
    const clienteIndex = data.clientes.findIndex(cliente => cliente.id === parseInt(clienteId));
    if (clienteIndex !== -1) {
        // Adiciona a nova mensagem ao array de mensagens do cliente
        data.clientes[clienteIndex].mensagens.push({ texto: mensagem, tipo: 'usuario' });
        
        // Atualiza os dados no localStorage
        localStorage.setItem('data', JSON.stringify(data));

        // Atualiza a exibição das mensagens no chat
        exibirMensagens(parseInt(clienteId));
    } else {
        console.log('Cliente não encontrado.');
    }
}

// Adicione esta chamada para exibir mensagens quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    const clienteId = localStorage.getItem('clienteSelecionado');
    if (clienteId) {
        exibirMensagens(parseInt(clienteId));
    }
});

// Adicione este evento para capturar o envio de mensagem
document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        enviarMensagem(messageText);
        messageInput.value = ''; // Limpa o campo de entrada após enviar a mensagem
    }
});