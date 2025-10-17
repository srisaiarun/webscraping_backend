import React from "react";

function MatchDetail({ match, onBack }) {
  return (
    <div className="match-detail-container">
      <button className="back-btn" onClick={onBack}>⬅ Back</button>
      <h2>Match Details</h2>
      <div className="match-detail-card">
        <div className="team-score">
          <span className="team-name">{match.team_a}</span>
          <span className="score">{match.score_a}</span>
        </div>
        <div className="team-score">
          <span className="team-name">{match.team_b}</span>
          <span className="score">{match.score_b}</span>
        </div>
        <p className="match-status">Status: {match.status.toUpperCase()}</p>
      </div>
    </div>
  );
}

export default MatchDetail;
