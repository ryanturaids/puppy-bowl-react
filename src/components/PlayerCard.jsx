import React from "react";
import "./PlayerCard.css";
import { Link } from "react-router-dom";

export default function PlayerCard({ player, onDelete }) {
  return (
    <div className="player-card">
      <p>{player.id}</p>
      <img src={player.imageUrl} alt={`image of ${player.name}`} />
      <h2>{player.name}</h2>
      <div className="buttons">
        <Link to={`/player/${player.id}`}>
          <button id="details-button">See Details</button>
        </Link>
        <button id="delete-button" onClick={() => onDelete(player.id)}>
          Delete Player
        </button>
      </div>
    </div>
  );
}
