
// src/pages/Players.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import PlayerCard from '../components/PlayerCard';
import AddPlayerForm from '../components/AddPlayerForm';

const Players = () => {
  const { players, loading, error, refreshData } = useContext(AppContext);
  const [showAddForm, setShowAddForm] = useState(false);

  const handlePlayerAdded = () => {
    refreshData();
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="loading">Loading players...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="players-page">
      <div className="container">
        <div className="page-header">
          <h1>Players</h1>
          <button 
            className="btn primary" 
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add Player'}
          </button>
        </div>
        
        {showAddForm && (
          <AddPlayerForm onPlayerAdded={handlePlayerAdded} />
        )}
        
        <div className="players-grid">
          {players.map((player, index) => (
            <PlayerCard key={player.id} player={player} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Players;
