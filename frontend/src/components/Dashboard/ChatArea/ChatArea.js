import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../../contexts/SocketContext';
import { useAuth } from '../../../contexts/AuthContext';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import axios from 'axios';
import './ChatArea.css';

const ChatArea = ({ chat, onMessageSent }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const { socket } = useSocket();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chat) {
      fetchMessages();
    }
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', handleNewMessage);
      socket.on('userTyping', handleUserTyping);
      
      return () => {
        socket.off('newMessage', handleNewMessage);
        socket.off('userTyping', handleUserTyping);
      };
    }
  }, [socket, chat]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/chat/${chat._id}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = (messageData) => {
    if (messageData.chatId === chat._id) {
      setMessages(prev => [...prev, messageData]);
    }
  };

  const handleUserTyping = (data) => {
    if (data.userId !== user.id) {
      setTyping(data.isTyping);
      if (data.isTyping) {
        setTimeout(() => setTyping(false), 3000);
      }
    }
  };

  const handleSendMessage = async (content, messageType = 'text') => {
    try {
      const response = await axios.post(`/api/chat/${chat._id}/messages`, {
        content,
        messageType
      });

      const newMessage = response.data;
      setMessages(prev => [...prev, newMessage]);
      onMessageSent(newMessage);

      // Emit socket event
      if (socket) {
        const otherParticipant = chat.participants.find(p => p._id !== user.id);
        socket.emit('sendMessage', {
          ...newMessage,
          chatId: chat._id,
          recipientId: otherParticipant._id
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTyping = (isTyping) => {
    if (socket) {
      const otherParticipant = chat.participants.find(p => p._id !== user.id);
      socket.emit('typing', {
        recipientId: otherParticipant._id,
        isTyping
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getChatInfo = () => {
    if (chat.isGroup) {
      return {
        name: chat.groupName,
        avatar: chat.groupName[0],
        isOnline: false
      };
    }

    const otherParticipant = chat.participants.find(p => p._id !== user.id);
    return {
      name: `${otherParticipant?.firstName} ${otherParticipant?.lastName}`,
      avatar: `${otherParticipant?.firstName[0]}${otherParticipant?.lastName[0]}`,
      isOnline: otherParticipant?.isOnline || false
    };
  };

  if (loading) {
    return (
      <div className="chat-area">
        <div className="chat-loading">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="chat-area">
      <ChatHeader chatInfo={getChatInfo()} />
      
      <MessageList 
        messages={messages}
        currentUserId={user.id}
        typing={typing}
      />
      
      <div ref={messagesEndRef} />
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
      />
    </div>
  );
};

export default ChatArea;