// src/components/AddMatchForm.jsx
import React, { useState } from 'react';
import { createMatch } from '../services/api';

const AddMatchForm = ({ players, onMatchAdded }) => {
  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (player1Id === player2Id) {
        setError('Please select different players');
        return;
        }
        
        try {
        setLoading(true);
        setError('');
        
        const matchData = {
            player1_id: (player1Id),
            player2_id: player2Id,
            player1_score: parseInt(player1Score),
            player2_score: parseInt(player2Score)
        };
        
        await createMatch(matchData);
        
        // Reset form
        setPlayer1Id('');
        setPlayer2Id('');
        setPlayer1Score(0);
        setPlayer2Score(0);
        
        // Notify parent component
        if (onMatchAdded) {
            onMatchAdded();
        }
        
        } catch (err) {
        setError(err.message || 'Failed to add match');
        } finally {
        setLoading(false);
        }
    };
    
    return (
        <div className="add-match-form card">
        <h2>Record New Match</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
            <div className="form-row">
            <div className="form-group">
                <label htmlFor="player1">Player 1</label>
                <select
                id="player1"
                value={player1Id}
                onChange={(e) => setPlayer1Id(e.target.value)}
                required
                >
                <option value="">Select Player</option>
                {players.map(player => (
                    <option key={player.id} value={player.id}>
                    {player.name}
                    </option>
                ))}
                </select>
            </div>
            
            <div className="form-group score-group">
                <label htmlFor="player1Score">Score</label>
                <input
                type="number"
                id="player1Score"
                min="0"
                value={player1Score}
                onChange={(e) => setPlayer1Score(e.target.value)}
                required
                />
            </div>
            </div>
            
            <div className="vs-divider">VS</div>
            
            <div className="form-row">
            <div className="form-group">
                <label htmlFor="player2">Player 2</label>
                <select
                id="player2"
                value={player2Id}
                onChange={(e) => setPlayer2Id(e.target.value)}
                required
                >
                <option value="">Select Player</option>
                {players.map(player => (
                    <option key={player.id} value={player.id}>
                    {player.name}
                    </option>
                ))}
                </select>
            </div>
            
            <div className="form-group score-group">
                <label htmlFor="player2Score">Score</label>
                <input
                type="number"
                id="player2Score"
                min="0"
                value={player2Score}
                onChange={(e) => setPlayer2Score(e.target.value)}
                required
                />
            </div>
            </div>
            
            <button type="submit" className="btn primary" disabled={loading}>
            {loading ? 'Recording...' : 'Record Match'}
            </button>
        </form>
        </div>
    );
    };
    
    export default AddMatchForm;
    