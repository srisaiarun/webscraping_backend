import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MatchCard({ match }) {
  const isLive = match.status === "live";
  const statusColor = isLive ? "#ff3e3e" : match.status === "scheduled" ? "#1e90ff" : "#28a745";

  return (
    <Link
      to={`/match/${match.match_id}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 20px",
        marginBottom: "15px",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
        textDecoration: "none",
        color: "#fff",
        background: isLive ? "linear-gradient(90deg, #ff6b6b, #ff3e3e)" : "#1e90ff",
        transition: "transform 0.3s",
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={match.logo_a} alt={match.team_a} style={{ width: "40px", marginRight: "10px" }} />
        <span>{match.team_a}</span>
      </div>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {match.score_a} — {match.score_b}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>{match.team_b}</span>
        <img src={match.logo_b} alt={match.team_b} style={{ width: "40px", marginLeft: "10px" }} />
      </div>
      <div style={{ marginLeft: "20px", fontWeight: "bold", color: statusColor }}>
        {isLive ? "● LIVE" : match.status.toUpperCase()}
      </div>
    </Link>
  );
}

function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/sports/live");
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "30px", minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>🔥 Live Matches</h2>
      {loading ? <p style={{ textAlign: "center" }}>Loading...</p> :
        matches.length === 0 ? <p style={{ textAlign: "center" }}>No live matches currently.</p> :
        matches.map(match => <MatchCard key={match.match_id} match={match} />)
      }
      <Link to="/" style={{ display: "block", marginTop: "20px", color: "#1e90ff", textAlign: "center" }}>⬅ Back to Home</Link>
    </div>
  );
}

export default LiveMatches;
