import React, { useState } from "react";
import Board from "./components/Board";
import "./App.css";

const icons = {
  Heart: "❤️",
  Star: "⭐",
  Crown: "👑",
  Dog: "🐶",
  Apple: "🍎",
  Pencil: "✏️",
  Rainbow: "🌈",
  TopHat: "🎩",
  Shoe: "👟",
  Computer: "💻",
  PeopleHugging: "🤗"
};

function App() {
  const [players, setPlayers] = useState({});
  const [playerName, setPlayerName] = useState("");
  const [playerPiece, setPlayerPiece] = useState("Heart");
  const [currentTurn, setCurrentTurn] = useState(null);
  const [diceRoll, setDiceRoll] = useState(null);

  const addPlayer = () => {
    if (!playerName.trim()) return alert("Please enter a name.");
    if (players[playerName]) return alert("This player name is already taken!");

    setPlayers((prev) => ({
      ...prev,
      [playerName]: {
        name: playerName,
        piece: icons[playerPiece],
        position: 0,
        points: 0
      }
    }));

    setCurrentTurn(playerName); // First player added starts
  };

  const rollDice = () => {
    if (!currentTurn) return alert("No players have joined yet!");

    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);

    setPlayers((prev) => {
      const updatedPlayers = { ...prev };
      const player = updatedPlayers[currentTurn];

      player.position = (player.position + roll) % 20;
      player.points += 1;

      if (player.position === 19) {
        player.points += 2; // Bonus for special tile
      }

      return updatedPlayers;
    });

    // Move turn to next player
    const playerNames = Object.keys(players);
    const currentIndex = playerNames.indexOf(currentTurn);
    const nextPlayer = playerNames[(currentIndex + 1) % playerNames.length];
    setCurrentTurn(nextPlayer);
  };

  return (
    <div className="App">
      <h1>Social Work Monopoly - Online</h1>

      <h2>Players in Game:</h2>
      <ul>
        {Object.values(players).map((player) => (
          <li key={player.name}>
            {player.name} - {player.piece} | Points: {player.points}
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <select value={playerPiece} onChange={(e) => setPlayerPiece(e.target.value)}>
        {Object.keys(icons).map((key) => (
          <option key={key} value={key}>
            {icons[key]} {key}
          </option>
        ))}
      </select>

      <button onClick={addPlayer}>Join Game</button>

      <h2>Game Board</h2>
      {diceRoll !== null && <p>You rolled a {diceRoll}!</p>}
      <button onClick={rollDice}>Roll Dice</button>

      <Board players={players} currentTurn={currentTurn} />
    </div>
  );
}

export default App;
