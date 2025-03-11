const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001; // Ensures compatibility with Render

app.use(cors());
app.use(express.json());

// Simple test route to check if the server is running
app.get("/", (req, res) => {
    res.send("Social Work Monopoly Game Server is Running!");
});

// Placeholder for game logic (e.g., adding players, rolling dice)
let players = [];

app.post("/add-player", (req, res) => {
    const { name, piece } = req.body;
    if (!name || !piece) {
        return res.status(400).json({ message: "Name and piece are required!" });
    }
    players.push({ name, piece, points: 0, position: 0 });
    res.json({ message: "Player added!", players });
});

app.post("/roll-dice", (req, res) => {
    const { name } = req.body;
    const player = players.find(p => p.name === name);
    if (!player) {
        return res.status(404).json({ message: "Player not found!" });
    }
    const roll = Math.floor(Math.random() * 6) + 1;
    player.position = (player.position + roll) % 24; // Assuming 24 board spaces
    player.points += 1; // Award 1 point per move

    // Award extra points for special tiles
    const bonusTiles = [5, 12, 18]; // Example positions
    if (bonusTiles.includes(player.position)) {
        player.points += 2; // Extra points for landing on bonus spots
    }

    res.json({ message: `${name} rolled a ${roll}!`, player });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
