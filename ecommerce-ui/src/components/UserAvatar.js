import React from 'react';
import './UserAvatar.css';

const UserAvatar = ({ name, size = 'medium' }) => {
  const getInitial = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const getColor = (name) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  return (
    <div 
      className={`user-avatar ${size}`}
      style={{ backgroundColor: getColor(name) }}
    >
      {getInitial(name)}
    </div>
  );
};

export default UserAvatar;
