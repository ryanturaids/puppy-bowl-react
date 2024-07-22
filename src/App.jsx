import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PlayerGrid from "./components/PlayerGrid";
import PlayerDetail from "./components/PlayerDetail";
import PlayerForm from "./components/PlayerForm";

function App() {
  return (
    <>
      <Router>
        <header>
          <h1>Puppy Bowl</h1>
          <nav>
            <Link to={"/"}>
              <button>Roster</button>
            </Link>
            <Link to={"/player-form"}>
              <button>Add Player</button>
            </Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<PlayerGrid />} />
          <Route path="/player/:id" element={<PlayerDetail />} />
          <Route path="/player-form" element={<PlayerForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
