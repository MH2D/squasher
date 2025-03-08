// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Helper function for API requests
async function fetchWithAuth(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An error occurred while fetching data'
    }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Players API
export const fetchPlayers = () => fetchWithAuth('/players');

export const fetchPlayer = (id) => fetchWithAuth(`/players/${id}`);

export const createPlayer = (playerData) => fetchWithAuth('/players', {
  method: 'POST',
  body: JSON.stringify(playerData),
});



// Matches API
export const fetchMatches = () => fetchWithAuth('/matches');

export const createMatch = (matchData) => fetchWithAuth('/matches', {
  method: 'POST',
  body: JSON.stringify(matchData),
});