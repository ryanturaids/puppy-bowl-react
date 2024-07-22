import API_URL from "../assets/dataAPI";
import "./PlayerForm.css";
import { useState } from "react";
export default function PlayerForm() {
  const [submit, setSubmit] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: event.target.name.value,
          breed: event.target.breed.value,
          imageUrl: event.target.imageUrl.value,
          teamId: event.target.teamId.value,
          status: event.target.status.value,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create player: ${errorText}`);
      } else {
        setSubmit(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (submit) {
    return <div className="submission-message">Player Added!</div>;
  }
  return (
    <div className="form-container">
      <h2>Add Player Form</h2>
      <form className="add-player-form" onSubmit={onSubmit}>
        <label>
          <span>Name:</span>
          <input type="text" name="name" />
        </label>
        <label>
          <span>Breed:</span>
          <input type="text" name="breed" />
        </label>
        <label>
          <span>Image URL:</span>
          <input type="url" name="imageUrl" />
        </label>
        <label>
          <span>Team ID:</span>
          <input type="number" name="teamId" />
        </label>
        <label>
          <span>Status:</span>
          <select name="status">
            <option value="bench">Bench</option>
            <option value="field">Field</option>
          </select>
        </label>
        <button type="submit">Add New Player</button>
      </form>
    </div>
  );
}
