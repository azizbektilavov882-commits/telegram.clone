import React from 'react';
import { FiPhone, FiVideo, FiMoreVertical } from 'react-icons/fi';
import './ChatHeader.css';

const ChatHeader = ({ chatInfo }) => {
  return (
    <div className="chat-header">
      <div className="chat-info">
        <div className="chat-avatar">
          {chatInfo.avatar}
        </div>
        <div className="chat-details">
          <h3>{chatInfo.name}</h3>
          <span className={`status ${chatInfo.isOnline ? 'online' : 'offline'}`}>
            {chatInfo.isOnline ? 'Online' : 'Last seen recently'}
          </span>
        </div>
      </div>
      
      <div className="chat-actions">
        <button className="action-btn" title="Voice call">
          <FiPhone />
        </button>
        <button className="action-btn" title="Video call">
          <FiVideo />
        </button>
        <button className="action-btn" title="More options">
          <FiMoreVertical />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;