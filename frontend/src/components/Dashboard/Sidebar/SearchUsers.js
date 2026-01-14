import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiX, FiSearch } from 'react-icons/fi';
import './SearchUsers.css';

const SearchUsers = ({ onUserSelect, onClose }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      searchUsers();
    } else {
      setUsers([]);
    }
  }, [query]);

  const searchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/users/search?query=${query}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = async (user) => {
    try {
      const response = await axios.post('/api/chat/create', {
        participantId: user._id
      });
      onUserSelect(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div className="search-users">
      <div className="search-header">
        <h3>New Chat</h3>
        <button onClick={onClose} className="close-btn">
          <FiX />
        </button>
      </div>
      
      <div className="search-input-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="search-results">
        {loading && <div className="search-loading">Searching...</div>}
        
        {users.map(user => (
          <div 
            key={user._id} 
            className="user-item"
            onClick={() => handleUserSelect(user)}
          >
            <div className="user-avatar">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="user-details">
              <div className="user-name">
                {user.firstName} {user.lastName}
              </div>
              <div className="user-username">@{user.username}</div>
            </div>
            {user.isOnline && <div className="online-indicator"></div>}
          </div>
        ))}
        
        {query && !loading && users.length === 0 && (
          <div className="no-results">No users found</div>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;