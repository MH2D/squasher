// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Squash League</h1>
        </Link>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Leaderboard</Link></li>
            <li><Link to="/players">Players</Link></li>
            <li><Link to="/matches">Matches</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
