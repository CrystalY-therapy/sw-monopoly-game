import React from "react";
import "./Board.css";

const Board = ({ players = {}, currentTurn }) => {
    const boardTiles = [
        { name: "Start", color: "yellow" },
        { name: "Advocacy Center", color: "lightblue" },
        { name: "Community Fund", color: "white" },
        { name: "Social Justice Org", color: "pink" },
        { name: "Crisis Event", color: "gray" },
        { name: "Mental Health Clinic", color: "orange" },
        { name: "Self-Care Break", color: "lightblue" },
        { name: "Child Welfare Agency", color: "red" },
        { name: "Social Work Fund", color: "white" },
        { name: "Nonprofit HQ", color: "yellow" },
        { name: "Policy Change Event", color: "green" },
        { name: "Housing Support", color: "lightgreen" },
        { name: "Crisis Hotline", color: "orangered" },
        { name: "Ethics Review", color: "blue" },
        { name: "Go To Self-Care", color: "lightblue" },
        { name: "Disability Services", color: "darkblue" },
        { name: "Advocacy Training", color: "orange" },
        { name: "Public Awareness", color: "pink" },
        { name: "Grant Writing", color: "yellow" },
        { name: "Policy Development", color: "darkgreen" },
        { name: "Bonusly Cards", color: "purple", isBonusly: true }
    ];

    return (
        <div className="board">
            {boardTiles.map((tile, index) => (
                <div
                    key={index}
                    className="tile"
                    style={{ backgroundColor: tile.color, position: "relative" }}
                >
                    <span className="tile-name">{tile.name}</span>

                    {/* Show Players on the Tile */}
                    {Object.values(players).map((player, playerIndex) =>
                        player.position === index ? (
                            <span key={playerIndex} className="player-icon">
                                {player.piece}
                            </span>
                        ) : null
                    )}

                    {/* Special styling for Bonusly Cards */}
                    {tile.isBonusly && <span className="star">⭐</span>}
                </div>
            ))}
        </div>
    );
};

export default Board;
