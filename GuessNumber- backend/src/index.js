import express from "express"; 
import cors from "cors"; 
import { getHighscores, saveHighscore } from './handledb.js'; 

const app = express(); 
app.use(express.json()); 
app.use(cors());


app.get('/highscores', async (req, res) => {
    const highscores = await getHighscores(); 
    res.json(highscores); 
});


app.post('/highscores', async (req, res) => {
    const { name, score } = req.body; 
    await saveHighscore(name, score); 
    res.json({ message: 'Highscore saved ' }); // Bekräfta att highscore har sparats
});


app.listen(3000, () => { 
    console.log("Lyssnar på port 3000");
});
