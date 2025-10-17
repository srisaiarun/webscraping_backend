import React, { useEffect, useState } from "react";

function App() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Fetch live matches
        const liveResponse = await fetch("http://127.0.0.1:8000/sports/live");
        const liveData = await liveResponse.json();

        // Fetch upcoming matches
        const upcomingResponse = await fetch("http://127.0.0.1:8000/sports/upcoming");
        const upcomingData = await upcomingResponse.json();

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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🏏 Live Sports Dashboard</h1>

      {loading ? (
        <p>Loading data from backend...</p>
      ) : (
        <>
          <section>
            <h2>🔥 Live Matches</h2>
            {liveMatches.length > 0 ? (
              <ul>
                {liveMatches.map((match, i) => (
                  <li key={i}>
                    {match.team_a} vs {match.team_b} — {match.status.toUpperCase()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No live matches currently.</p>
            )}
          </section>

          <section style={{ marginTop: "20px" }}>
            <h2>⏳ Upcoming Matches</h2>
            {upcomingMatches.length > 0 ? (
              <ul>
                {upcomingMatches.map((match, i) => (
                  <li key={i}>
                    {match.team_a} vs {match.team_b} — {match.status.toUpperCase()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming matches found.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default App;
