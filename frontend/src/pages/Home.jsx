// src/pages/Home.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import MatchHistory from '../components/MatchHistory';
import Leaderboard from '../components/Leaderboard';


console.log("Leaderboard component loaded!");


const Home = () => {
  const { players, matches, loading, error } = useContext(AppContext);

  if (loading) {
    return <div className="loading">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="intro-banner">
          <h1>Squash Leaderboard</h1>
          <p>Track your games, climb the ranks!</p>
        </div>
        
        <div className="dashboard-grid">
          <div className="main-column">
            <Leaderboard players={players} />
          </div>
          <div className="side-column">
            <MatchHistory matches={matches.slice(0, 5)} players={players} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;