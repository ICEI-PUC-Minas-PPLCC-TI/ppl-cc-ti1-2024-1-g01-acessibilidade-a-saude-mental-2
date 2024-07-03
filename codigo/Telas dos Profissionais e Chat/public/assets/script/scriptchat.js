// Função para carregar as mensagens do cliente selecionado
function carregarMensagensCliente(clienteId) {
    fetch(`/clientes`) // Certifique-se de que a URL está correta
        .then(response => response.json())
        .then(data => {
            const cliente = data.find(cliente => cliente.id === clienteId);
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

    if (!clientes || !Array.isArray(clientes)) {
        console.error('Clientes não definidos ou não são um array.');
        return;
    }

    clientes.forEach(cliente => {
        const clienteItem = document.createElement('li');
        clienteItem.innerHTML = `
            <a href="#" class="d-flex align-items-center">
                <img src="assets/imagens/clientes.png" alt="${cliente.nome}" class="avatar">
                <span class="text">${cliente.nome}</span>
            </a>
        `;
        clienteItem.addEventListener('click', () => {
            localStorage.setItem('clienteSelecionado', cliente.id);
            carregarMensagensCliente(cliente.id);
        });
        clientesList.appendChild(clienteItem);
    });
}

// Inicialização: Carregar lista de clientes
fetch(`/clientes`) // Certifique-se de que a URL está correta
    .then(response => response.json())
    .then(data => {
        criarListaClientes(data);
    })
    .catch(error => {
        console.error('Erro ao carregar clientes:', error);
    });





// Função para enviar mensagens
function enviarMensagem(mensagem) {
    const clienteId = localStorage.getItem('clienteSelecionado');
    if (!clienteId) {
        console.error('ID do cliente não encontrado no localStorage');
        return;
    }

    const url = `/clientes/${clienteId}`;

    fetch(url)
        .then(response => response.json())
        .then(cliente => {
            // Adiciona a nova mensagem ao array de mensagens do cliente
            cliente.mensagens.push({ texto: mensagem, tipo: 'usuario' });

            // Atualiza os dados no servidor Replit
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente)
            })
            .then(response => response.json())
            .then(updatedCliente => {
                console.log('Dados atualizados com sucesso:', updatedCliente);
                // Atualiza a exibição das mensagens no chat
                exibirMensagens(updatedCliente.mensagens);
            })
            .catch(error => {
                console.error('Erro ao atualizar dados:', error);
            });
        })
        .catch(error => {
            console.error('Erro ao obter dados do cliente:', error);
        });
}

// Adicionando um ouvinte de evento para o formulário de envio de mensagem
document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        enviarMensagem(messageText);
        messageInput.value = ''; // Limpa o campo de entrada após enviar a mensagem
    }
});
