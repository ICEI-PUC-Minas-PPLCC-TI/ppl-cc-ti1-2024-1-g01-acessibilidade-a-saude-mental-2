// scriptagenda.js

// Função para preencher a tabela com os compromissos do JSON
function preencherCalendario() {
    const tbody = document.getElementById('corpo-calendario');
    const compromissosPorDia = {}; // Objeto para armazenar os compromissos por dia

    // Carregar dados do JSON
    fetch(`/compromissos`)
        .then(response => response.json())
        .then(compromissos => {
            // Organizar os compromissos por dia
            compromissos.forEach(compromisso => {
                if (!compromissosPorDia[compromisso.dia]) {
                    compromissosPorDia[compromisso.dia] = [];
                }
                compromissosPorDia[compromisso.dia].push(compromisso);
            });

            // Preencher o calendário com os compromissos organizados por dia
            Object.keys(compromissosPorDia).forEach(dia => {
                const compromissosDoDia = compromissosPorDia[dia];

                // Criar uma linha na tabela com o dia
                const trDia = document.createElement('tr');
                const tdDia = document.createElement('td');
                tdDia.classList.add('calendario-dia');
                tdDia.setAttribute('colspan', '3');
                tdDia.textContent = dia;
                trDia.appendChild(tdDia);
                tbody.appendChild(trDia);

                // Criar linhas na tabela com os compromissos do dia
                compromissosDoDia.forEach(compromisso => {
                    const trCompromisso = document.createElement('tr');
                    trCompromisso.classList.add('calendario-row');
                    trCompromisso.innerHTML = `
                        <td class="calendario-horario">${compromisso.horario}</td>
                        <td class="calendario-paciente">${compromisso.paciente}</td>
                    `;
                    tbody.appendChild(trCompromisso);
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados do JSON:', error);
        });
}

// Chamar a função para preencher o calendário quando a página carregar
window.onload = preencherCalendario;
