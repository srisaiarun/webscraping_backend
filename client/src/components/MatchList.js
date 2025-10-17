import React from "react";

function MatchList({ matches, title, onClick, onBack }) {
  return (
    <div className="match-list-container">
      <button className="back-btn" onClick={onBack}>⬅ Back</button>
      <h2>{title}</h2>
      {matches.length === 0 ? (
        <p>No matches available.</p>
      ) : (
        <ul>
          {matches.map((match, i) => (
            <li key={i} className="match-card" onClick={() => onClick(match)}>
              <div>
                <span className="team-name">{match.team_a}</span> vs <span className="team-name">{match.team_b}</span>
              </div>
              <span className="match-status">{match.status.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MatchList;
