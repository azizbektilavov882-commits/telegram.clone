const express = require('express');
const Chat = require('../models/Chat');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all chats for user
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.userId
    })
    .populate('participants', 'username firstName lastName avatar isOnline lastSeen')
    .populate('lastMessage.sender', 'username firstName lastName')
    .sort({ lastActivity: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get or create chat with user
router.post('/create', auth, async (req, res) => {
  try {
    const { participantId, isGroup, groupName } = req.body;

    if (isGroup) {
      // Create group chat
      const chat = new Chat({
        participants: [req.userId, ...participantId],
        isGroup: true,
        groupName,
        groupAdmin: req.userId
      });
      await chat.save();
      await chat.populate('participants', 'username firstName lastName avatar');
      return res.json(chat);
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      participants: { $all: [req.userId, participantId] },
      isGroup: false
    }).populate('participants', 'username firstName lastName avatar isOnline lastSeen');

    if (!chat) {
      // Create new chat
      chat = new Chat({
        participants: [req.userId, participantId]
      });
      await chat.save();
      await chat.populate('participants', 'username firstName lastName avatar isOnline lastSeen');
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get messages for a chat
router.get('/:chatId/messages', auth, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    
    const chat = await Chat.findById(req.params.chatId)
      .populate('messages.sender', 'username firstName lastName avatar');

    if (!chat || !chat.participants.includes(req.userId)) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const messages = chat.messages
      .slice(-(page * limit))
      .reverse();

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send message
router.post('/:chatId/messages', auth, async (req, res) => {
  try {
    const { content, messageType = 'text' } = req.body;

    const chat = await Chat.findById(req.params.chatId);
    if (!chat || !chat.participants.includes(req.userId)) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const message = {
      sender: req.userId,
      content,
      messageType
    };

    chat.messages.push(message);
    chat.lastMessage = message;
    chat.lastActivity = new Date();

    await chat.save();
    await chat.populate('messages.sender', 'username firstName lastName avatar');

    const newMessage = chat.messages[chat.messages.length - 1];
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search messages
router.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    
    const chats = await Chat.find({
      participants: req.userId,
      'messages.content': { $regex: query, $options: 'i' }
    })
    .populate('participants', 'username firstName lastName avatar')
    .populate('messages.sender', 'username firstName lastName');

    const results = [];
    chats.forEach(chat => {
      const matchingMessages = chat.messages.filter(msg => 
        msg.content.toLowerCase().includes(query.toLowerCase())
      );
      if (matchingMessages.length > 0) {
        results.push({
          chat,
          messages: matchingMessages
        });
      }
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;