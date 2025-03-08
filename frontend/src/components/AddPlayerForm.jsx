
// src/components/AddPlayerForm.jsx
import React, { useState } from 'react';
import { createPlayer } from '../services/api';

const AddPlayerForm = ({ onPlayerAdded }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('name', name);
      console.log(formData.get("name"));
      const form_json = Object.fromEntries(formData.entries());
      await createPlayer(form_json);
      
      // Reset form
      setName('');
      
      // Notify parent component
      if (onPlayerAdded) {
        onPlayerAdded();
      }
      
    } catch (err) {
      setError(err.message || 'Failed to add player');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-player-form card">
      <h2>Add New Player</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Player'}
        </button>
      </form>
    </div>
  );
};

export default AddPlayerForm;
