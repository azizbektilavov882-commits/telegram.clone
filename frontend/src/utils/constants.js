// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  USERS: {
    SEARCH: '/users/search',
    PROFILE: '/users/profile',
    GET_USER: (userId) => `/users/${userId}`,
  },
  CHAT: {
    GET_CHATS: '/chat',
    CREATE_CHAT: '/chat/create',
    GET_MESSAGES: (chatId) => `/chat/${chatId}/messages`,
    SEND_MESSAGE: (chatId) => `/chat/${chatId}/messages`,
    SEARCH_MESSAGES: '/chat/search',
  },
};

// Socket Events
export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN: 'join',
  
  // Messages
  SEND_MESSAGE: 'sendMessage',
  NEW_MESSAGE: 'newMessage',
  MESSAGE_SENT: 'messageSent',
  
  // Typing
  TYPING: 'typing',
  USER_TYPING: 'userTyping',
  
  // User Status
  USER_ONLINE: 'userOnline',
  USER_OFFLINE: 'userOffline',
};

// Message Types
export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  VOICE: 'voice',
};

// Theme Colors
export const COLORS = {
  PRIMARY: '#0088cc',
  PRIMARY_DARK: '#006699',
  SUCCESS: '#4caf50',
  ERROR: '#dc3545',
  WARNING: '#ffc107',
  INFO: '#17a2b8',
  LIGHT: '#f8f9fa',
  DARK: '#343a40',
  BORDER: '#e1e5e9',
  TEXT_PRIMARY: '#333',
  TEXT_SECONDARY: '#666',
  TEXT_MUTED: '#999',
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: '768px',
  TABLET: '1024px',
  DESKTOP: '1200px',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};