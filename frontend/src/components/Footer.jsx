
// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Squash League Tracker</p>
      </div>
    </footer>
  );
};

export default Footer;