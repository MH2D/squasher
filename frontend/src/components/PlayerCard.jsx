// src/components/PlayerCard.jsx
import React from 'react';
import PlayerAvatar from './PlayerAvatar';

const PlayerCard = ({ player, rank }) => {
  // Calculate win percentage
  const winPercentage = player.games_played > 0 
    ? ((player.games_won / player.games_played) * 100).toFixed(1) 
    : 0;

  return (
    <div className="player-card">
      <div className="player-rank">{rank}</div>
      <div className="player-avatar">
        <PlayerAvatar url={player.avatar_url} name={player.name} />
      </div>
      <div className="player-info">
        <h3 className="player-name">{player.name}</h3>
        <div className="player-stats">
          <div className="stat">
            <span className="stat-label">Rating</span>
            <span className="stat-value">{Math.round(player.rating)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Win %</span>
            <span className="stat-value">{winPercentage}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Games</span>
            <span className="stat-value">{player.games_played}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;