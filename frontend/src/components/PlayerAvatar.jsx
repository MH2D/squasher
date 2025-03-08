// src/components/PlayerAvatar.jsx
import React from 'react';

const PlayerAvatar = ({ url, name }) => {
  if (url) {
    return <img src={url} alt={`${name}'s avatar`} className="avatar" />;
  }
  
  // Generate initials for avatar placeholder
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  // Generate a deterministic color based on the name
  const hue = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
  
  return (
    <div 
      className="avatar-placeholder" 
      style={{ backgroundColor: `hsl(${hue}, 70%, 60%)` }}
    >
      {initials}
    </div>
  );
};

export default PlayerAvatar;