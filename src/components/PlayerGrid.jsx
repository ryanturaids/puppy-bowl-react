import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import API_URL from "../assets/dataAPI";
import "./PlayerGrid.css";

export default function PlayerGrid() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.success) {
        setPlayers(data.data.players);
        setFilteredPlayers(data.data.players);
      } else {
        console.error("Error fetching player data:", data.error);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setPlayers(players.filter((player) => player.id !== id));
        setFilteredPlayers(
          filteredPlayers.filter((player) => player.id !== id)
        );
      } else {
        console.error("Failed to delete player");
      }
    } catch (error) {
      console.log(`Error deleting player: ${error}`);
    }
  };

  const handleSearch = () => {
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  if (loading) {
    return <div className="loading-message">Loading players...</div>;
  }

  if (filteredPlayers.length === 0 && searchInput) {
    return (
      <>
        <div className="search-bar">
          <span>Search for player by name:</span>
          <input
            className="search-box"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="empty-search-message">
          <p>There are no players named "{searchInput}"</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="search-bar">
        <span>Search for player by name:</span>
        <input
          className="search-box"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="player-grid">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}
