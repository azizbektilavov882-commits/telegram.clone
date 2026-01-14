import React from 'react';
import { FiCheck, FiCheckCircle } from 'react-icons/fi';
import './Message.css';

const Message = ({ message, isOwn }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className={`message ${isOwn ? 'own' : 'other'}`}>
      {!isOwn && (
        <div className="message-avatar">
          {message.sender.firstName[0]}{message.sender.lastName[0]}
        </div>
      )}
      
      <div className="message-content">
        {!isOwn && (
          <div className="message-sender">
            {message.sender.firstName} {message.sender.lastName}
          </div>
        )}
        
        <div className="message-bubble">
          <div className="message-text">
            {message.content}
          </div>
          
          <div className="message-meta">
            <span className="message-time">
              {formatTime(message.createdAt)}
            </span>
            {isOwn && (
              <div className="message-status">
                {message.isRead ? (
                  <FiCheckCircle className="read" />
                ) : (
                  <FiCheck className="sent" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;