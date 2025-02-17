import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API_URL from "../assets/dataAPI";
import "./PlayerDetail.css";

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        if (data.success) {
          setPlayer(data.data.player);
        } else {
          console.error("Error fetching player details:", data.error);
        }
      } catch (error) {
        console.error("Error fetching player details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerDetails();
  }, [id]);

  if (loading) {
    return <div className="message-div">Loading player details...</div>;
  }

  if (!player) {
    return <div className="message-div">Player not found</div>;
  }

  return (
    <div className="player-detail">
      <div>
        <h1>{player.name || "no name"}</h1>
        <img src={player.imageUrl} alt={`image of ${player.name}`} />
      </div>
      <div>
        <p>
          <strong>ID:</strong> {player.id}
        </p>
        <p>
          <strong>Breed:</strong> {player.breed || "no breed"}
        </p>
        <p>
          <strong>Status:</strong> {player.status || "no status"}
        </p>
        <p>
          <strong>Team ID:</strong> {player.teamId || "no team"}
        </p>
        <p>
          <strong>Team Name:</strong>&nbsp;
          {player.team?.name || "no team"}
        </p>
        <p>
          <strong>Cohort ID:</strong> {player.cohortId}
        </p>
        <Link to={"/"}>
          <button id="return-button">Return to Roster</button>
        </Link>
      </div>
    </div>
  );
}
