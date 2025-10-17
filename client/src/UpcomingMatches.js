import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/sports/upcoming");
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
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>⏳ Upcoming Matches</h2>
      {loading ? <p>Loading...</p> :
        <ul>
          {matches.map(match => (
            <li key={match.match_id}>
              <Link to={`/match/${match.match_id}`}>
                {match.team_a} vs {match.team_b}
              </Link>
            </li>
          ))}
        </ul>
      }
      <Link to="/">⬅ Back to Home</Link>
    </div>
  );
}

export default UpcomingMatches;
