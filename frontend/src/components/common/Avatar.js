import React from 'react';
import './Avatar.css';

const Avatar = ({ 
  src, 
  alt, 
  size = 'medium', 
  name, 
  isOnline = false, 
  showOnlineIndicator = false,
  className = '' 
}) => {
  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const getRandomColor = (name) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className={`avatar avatar-${size} ${className}`}>
      {src ? (
        <img src={src} alt={alt || name} className="avatar-image" />
      ) : (
        <div 
          className="avatar-placeholder"
          style={{ backgroundColor: getRandomColor(name || 'User') }}
        >
          {getInitials(name || alt || 'User')}
        </div>
      )}
      {showOnlineIndicator && (
        <div className={`online-indicator ${isOnline ? 'online' : 'offline'}`} />
      )}
    </div>
  );
};

export default Avatar;