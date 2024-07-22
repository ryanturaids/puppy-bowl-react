import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API_URL from "../assets/dataAPI";
import "./PlayerDetail.css";

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamLoading, setTeamLoading] = useState(true);

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
    return <div>Loading player details...</div>;
  }

  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <div className="player-detail">
      <div>
        <h1>{player.name}</h1>
        <img src={player.imageUrl} alt={`image of ${player.name}`} />
      </div>
      <div>
        <p>
          <strong>ID:</strong> {player.id}
        </p>
        <p>
          <strong>Breed:</strong> {player.breed}
        </p>
        <p>
          <strong>Status:</strong> {player.status}
        </p>
        <p>
          <strong>Team ID:</strong> {player.teamId}
        </p>
        <p>
          <strong>Team Name:</strong> {player.team.name}
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
