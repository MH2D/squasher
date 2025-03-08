// src/context/AppContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { fetchPlayers, fetchMatches } from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [playersData, matchesData] = await Promise.all([
          fetchPlayers(),
          fetchMatches()
        ]);
        
        setPlayers(playersData);
        setMatches(matchesData);
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = async () => {
    try {
      const [playersData, matchesData] = await Promise.all([
        fetchPlayers(),
        fetchMatches()
      ]);
      
      setPlayers(playersData);
      setMatches(matchesData);
    } catch (err) {
      console.error('Error refreshing data:', err);
    }
  };

  return (
    <AppContext.Provider value={{ 
      players, 
      matches, 
      loading, 
      error,
      refreshData
    }}>
      {children}
    </AppContext.Provider>
  );
};