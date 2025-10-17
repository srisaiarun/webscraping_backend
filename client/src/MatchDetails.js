import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);

  const fetchMatch = async () => {
    try {
      const resLive = await fetch("http://127.0.0.1:8000/sports/live");
      const liveData = await resLive.json();
      const resUpcoming = await fetch("http://127.0.0.1:8000/sports/upcoming");
      const upcomingData = await resUpcoming.json();
      const allMatches = [...liveData, ...upcomingData];
      const selected = allMatches.find(m => m.match_id === id);
      setMatch(selected);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMatch();
    const interval = setInterval(fetchMatch, 10000);
    return () => clearInterval(interval);
  }, [id]);

  if (!match) return <p style={{ color: "#fff", textAlign: "center" }}>Loading match details...</p>;

  return (
    <div style={{
      padding: "50px",
      minHeight: "100vh",
      background: "url('https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1950&q=80')",
      backgroundSize: "cover",
      color: "#fff",
      textAlign: "center"
    }}>
      <h2 style={{ fontSize: "3rem", marginBottom: "30px" }}>📌 Match Details</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "50px", marginBottom: "30px" }}>
        <div>
          <img src={match.logo_a} alt={match.team_a} style={{ width: "80px", animation: match.status==="live"?"pulse 1s infinite":"none" }} />
          <p style={{ fontSize: "1.5rem" }}>{match.team_a}</p>
        </div>
        <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
          {match.score_a} — {match.score_b}
        </div>
        <div>
          <img src={match.logo_b} alt={match.team_b} style={{ width: "80px", animation: match.status==="live"?"pulse 1s infinite":"none" }} />
          <p style={{ fontSize: "1.5rem" }}>{match.team_b}</p>
        </div>
      </div>
      <p style={{ fontSize: "1.2rem" }}>
        Status: {match.status === "live" ? <span style={{ color: "#ff3e3e", fontWeight: "bold" }}>● LIVE</span> : match.status.toUpperCase()}
      </p>
      <p>Last Updated: {new Date(match.last_updated).toLocaleString()}</p>
      <Link to="/" style={{ display: "block", marginTop: "30px", color: "#1e90ff", fontSize: "1.2rem" }}>⬅ Back to Home</Link>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default MatchDetails;
