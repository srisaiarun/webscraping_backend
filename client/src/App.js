import React, { useEffect, useState } from "react";
import MatchList from "./components/MatchList";
import MatchDetail from "./components/MatchDetail";

function App() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("home"); // "home", "live", "upcoming", "detail"
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const liveRes = await fetch("http://127.0.0.1:8000/sports/live");
        const liveData = await liveRes.json();

        const upcomingRes = await fetch("http://127.0.0.1:8000/sports/upcoming");
        const upcomingData = await upcomingRes.json();

        setLiveMatches(liveData);
        setUpcomingMatches(upcomingData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    setView("detail");
  };

  const handleBack = () => {
    setSelectedMatch(null);
    setView("home");
  };

  if (loading) {
    return <div className="loading">Loading matches...</div>;
  }

  return (
    <div className="app-container">
      <h1>🏏 Live Sports Dashboard</h1>

      {view === "home" && (
        <div className="home-buttons">
          <button onClick={() => setView("live")}>🔥 Live Matches</button>
          <button onClick={() => setView("upcoming")}>⏳ Upcoming Matches</button>
        </div>
      )}

      {view === "live" && (
        <MatchList matches={liveMatches} title="Live Matches" onClick={handleMatchClick} onBack={handleBack} />
      )}

      {view === "upcoming" && (
        <MatchList matches={upcomingMatches} title="Upcoming Matches" onClick={handleMatchClick} onBack={handleBack} />
      )}

      {view === "detail" && selectedMatch && (
        <MatchDetail match={selectedMatch} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
