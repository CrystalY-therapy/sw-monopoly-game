import React from "react";
import "./Board.css"; // Make sure Board.css exists

const Board = ({ players }) => {
  return (
    <div className="board-container">
      <h2>Game Board</h2>
      <div className="board">
        {players &&
          Object.values(players).map((player, index) => (
            <div key={index} className="player">
              {player.name} - {player.piece}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Board;
