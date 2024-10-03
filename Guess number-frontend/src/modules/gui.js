const baseUrl= 'http://localhost:3000/highscores'

function fetchHighscores() {
    fetch(baseUrl) // GET-förfrågan till backend för att hämta highscore-listan
        .then(response => response.json()) 
        .then(highscores => {
            const highScoreList = document.querySelector('#highScoreList'); // Hämta ol-elementet
            highScoreList.innerHTML = ''; 

            // Fyll listan med namn och poäng
            highscores.forEach(score => {
                const li = document.createElement('li');
                li.textContent = `${score.name}: ${score.score}`; // Visar namn och poäng
                highScoreList.appendChild(li);
            });
        });
}

async function submitHighScore(playerName, playersPoints) {
    fetch(baseUrl, { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playerName, score: playersPoints }) 
    })
    .then(response => response.json()) 
    .then(data => {
        console.log('Highscore sparat:', data); 
        fetchHighscores(); // Anropa fetchHighscores för att uppdatera listan
    })
   
}

export{fetchHighscores, submitHighScore};

