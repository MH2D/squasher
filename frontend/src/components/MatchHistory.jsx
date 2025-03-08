// src/components/MatchHistory.jsx
import React from 'react';
import PlayerAvatar from './PlayerAvatar';

const MatchHistory = ({ matches, players }) => {
  // Create a map of player IDs to player data for quick lookup
  const playerMap = players.reduce((acc, player) => {
    acc[player.id] = player;
    return acc;
  }, {});

  return (
    <div className="match-history">
      <h2>Recent Matches</h2>
      <div className="matches-list">
        {matches.map(match => {
          const player1 = playerMap[match.player1_id];
          const player2 = playerMap[match.player2_id];
          const isPlayer1Winner = match.player1_score > match.player2_score;
          
          // Skip if we can't find the players
          if (!player1 || !player2) return null;
          
          return (
            <div key={match.id} className="match-card">
              <div className="match-date">
                {new Date(match.date_played).toLocaleDateString()}
              </div>
              <div className="match-players">
                <div className={`player ${isPlayer1Winner ? 'winner' : ''}`}>
                  <PlayerAvatar url={player1.avatar_url} name={player1.name} />
                  <span className="player-name">{player1.name}</span>
                </div>
                <div className="match-score">
                  <span>{match.player1_score}</span>
                  <span>-</span>
                  <span>{match.player2_score}</span>
                </div>
                <div className={`player ${!isPlayer1Winner ? 'winner' : ''}`}>
                  <PlayerAvatar url={player2.avatar_url} name={player2.name} />
                  <span className="player-name">{player2.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchHistory;
