
// src/pages/Matches.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import MatchHistory from '../components/MatchHistory';
import AddMatchForm from '../components/AddMatchForm';

const Matches = () => {
  const { players, matches, loading, error, refreshData } = useContext(AppContext);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleMatchAdded = () => {
    refreshData();
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="loading">Loading matches...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="matches-page">
      <div className="container">
        <div className="page-header">
          <h1>Match History</h1>
          <button 
            className="btn primary" 
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Record Match'}
          </button>
        </div>
        
        {showAddForm && (
          <AddMatchForm 
            players={players} 
            onMatchAdded={handleMatchAdded} 
          />
        )}
        
        <MatchHistory matches={matches} players={players} />
      </div>
    </div>
  );
};

export default Matches;
