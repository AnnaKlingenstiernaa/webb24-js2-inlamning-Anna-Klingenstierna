import fs from "fs/promises";

async function getHighscores() {
    const rawdata = await fs.readFile('./src/database.json'); 
    return JSON.parse(rawdata); 
}

async function saveHighscore(name, score) { 
    const highscores = await getHighscores(); // Hämta den nuvarande highscore-listan

    highscores.push({ name, score }); // Lägg till den nya poängen i highscore-listan

    // Sortera och behåll endast de 5 bästa poängen
    const sortedHighscores = highscores
        .sort((a, b) => b.score - a.score) // Sortera listan så att högsta poängen kommer först
        .slice(0, 5); // Ta de 5 bästa poängen

    await fs.writeFile('./src/database.json', JSON.stringify( sortedHighscores , null, 2)); // Skriv tillbaka den uppdaterade highscore-listan till databasen
}


export { getHighscores, saveHighscore };  
