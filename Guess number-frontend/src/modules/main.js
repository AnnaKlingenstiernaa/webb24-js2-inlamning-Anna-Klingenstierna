import { submitHighScore, fetchHighscores } from './gui.js';

let playersPoints = 0; 
let correctNumber = generateNewNumber(); 

// Hämta formet där användaren gissar
const form = document.querySelector('#guessForm'); 
form.addEventListener('submit', handleGuess);  


function updateScore() { 
    document.querySelector('#pointcounter').innerText = `Dina poäng: ${playersPoints}`;
}
updateScore(); // Se till att poängen visas, även om den är 0
fetchHighscores();// Visa highscore listan hela tiden


function handleGuess(event) {
    event.preventDefault();
    const numberGuess = document.querySelector('input').value; 
    const resultEl = document.querySelector('#result'); //Visar rätt eller fel

    if (numberGuess == correctNumber) { 
        playersPoints++; 
        updateScore(); //uppdaterar poängvisning
        resultEl.innerText = "Du svarade rätt!";
        correctNumber = generateNewNumber(); // Datorn "tänker" på ett nytt nummer
    } else {
        resultEl.innerText = "Du svarade fel, försök igen!";
        updateScore();
        wrongAnswer(); // Hantera när användaren svarar fel
    }
}

// Visa namnformuläret efter fel svar
function applyName() {
    const nameDiv = document.querySelector('#namediv');
    nameDiv.innerHTML = ''; 

    const formInstructions = document.createElement('p'); // instruktioner för användaren 
    formInstructions.innerText = 'Bra gissat! Ange ditt namn för att se om du platsar i vår highscore lista';

    const nameForm = document.createElement('form');

    
    const playerNameInput = document.createElement('input');
    playerNameInput.type = 'text';
    playerNameInput.placeholder = 'Ange ditt namn';
    

    // Submit-knapp
    const submitName = document.createElement('input');
    submitName.type = 'submit';
    submitName.id = 'submitName';

  
    nameForm.appendChild(playerNameInput);
    nameForm.appendChild(submitName);

    nameDiv.appendChild(formInstructions);
    nameDiv.appendChild(nameForm);

   
    nameForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const playerName = playerNameInput.value; 

        submitHighScore(playerName, playersPoints); // Skicka highscore till servern

        nameDiv.innerHTML = ''; 
        playersPoints = 0; 
        updateScore(); 
        document.querySelector('#result').innerText = ''; 
    });
}


function wrongAnswer() {
    applyName(); // Visa namnformuläret
}

function generateNewNumber() {
    return Math.ceil(Math.random() * 3);
}
