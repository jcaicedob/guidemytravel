let destList = [];

fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        destList = data; // Store the data globally
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

document.getElementById('btnSearch').addEventListener('click', function () {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    const searchResults = [...destList.countries, ...destList.temples, ...destList.beaches];
    let found = false;

    resultsContainer.innerHTML = ''; // Clear previous results

    searchResults.forEach(item => {
        let destinations = item.cities || [item]; // Handle countries vs individual items like temples or beaches
        destinations.forEach(destination => {
            if (destination.name.toLowerCase().includes(searchValue)) {
                found = true;
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result-item';

                const nameDiv = document.createElement('h2');
                nameDiv.innerText = destination.name;

                const imageDiv = document.createElement('img');
                imageDiv.src = destination.imageUrl;

                const descriptionDiv = document.createElement('p');
                descriptionDiv.innerText = destination.description;

                resultDiv.appendChild(nameDiv);
                resultDiv.appendChild(imageDiv);
                resultDiv.appendChild(descriptionDiv);

                resultsContainer.appendChild(resultDiv);
            }
        });
    });

    if (found) {
        resultsContainer.style.display = 'flex';
    } else {
        resultsContainer.innerHTML = `<div class="no-result">No results found</div>`;
        resultsContainer.style.display = 'flex';
    }
});

document.getElementById('btnClear').addEventListener('click', function() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results
    resultsContainer.style.display = 'none';

});

function sendMessage() {
    alert("Message received. Thank you!")
}