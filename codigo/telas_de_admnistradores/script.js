function fetchData() {
    fetch('/data') 
        .then(response => response.json())
        .then(data => {
            const dataContainer = document.getElementById('data');
            dataContainer.innerHTML = '';
            data.forEach(item => {
                const listItem = document.createElement('div');
                listItem.textContent = JSON.stringify(item);
                dataContainer.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

