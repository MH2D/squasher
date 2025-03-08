// src/components/Leaderboard.jsx
import React from 'react';
import PlayerCard from './PlayerCard';

const Leaderboard = ({ players }) => {
  // Sort players by rating in descending order
  const sortedPlayers = [...players].sort((a, b) => b.rating - a.rating);

  return (
    <div className="leaderboard">
      <h2>Current Rankings</h2>
      <div className="leaderboard-grid">
        {sortedPlayers.map((player, index) => (
          <PlayerCard 
            key={player.id} 
            player={player} 
            rank={index + 1} 
          />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;