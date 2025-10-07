'use client';

import React from 'react';
import Image from 'next/image';
import { UserCardProps } from '../../../Interfaces/Board/user-card-interface';
import './UserCard.css';

const UserCard: React.FC<UserCardProps> = ({ user, onClick, className = '' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(user);
    }
  };

  return (
    <div 
      className={`user-card ${className}`}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="user-card-image-container">
        <Image
          src={user.image}
          alt={`${user.name} profile picture`}
          width={250}
          height={200}
          className="user-card-image"
          priority
        />
      </div>

      <div className="user-card-info">
        <div className="user-card-header">
          <h3 className="user-card-name">
            {user.name}, <span className="user-card-age">{user.age}</span>
          </h3>
          <span className="user-card-location">{user.location}</span>
        </div>
        
        <p className="user-card-quote">"{user.quote}"</p>
      </div>
    </div>
  );
};

export default UserCard;
