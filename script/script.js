document.getElementById('search-btn').addEventListener('click', function() {
    const teamName = document.getElementById('search-team').value;
    fetchMatches(teamName);
});

async function fetchMatches(teamName) {
    const apiKey = 'My-API-KEY'; 
    const url = `https://api.football-data.org/v4/matches?team=${teamName}`;

    const response = await fetch(url, {
        headers: {
            'X-Auth-Token': apiKey
        }
    });

    const data = await response.json();
    displayMatches(data.matches);
}

function displayMatches(matches) {
    const matchList = document.getElementById('match-list');
    matchList.innerHTML = ''; // Clear any previous matches

    if (matches.length === 0) {
        matchList.innerHTML = '<p>No matches found for this team.</p>';
        return;
    }

    matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.classList.add('match-item');
        
        const matchDate = new Date(match.utcDate).toLocaleString();
        matchElement.innerHTML = `
            <h3>${match.homeTeam.name} vs ${match.awayTeam.name}</h3>
            <p>Date: ${matchDate}</p>
            <p>Status: ${match.status}</p>
            <p>Score: ${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</p>
        `;
        
        matchList.appendChild(matchElement);
    });
}
