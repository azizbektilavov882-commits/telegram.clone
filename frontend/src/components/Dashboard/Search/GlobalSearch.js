import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce } from '../../../hooks/useDebounce';
import axios from 'axios';
import Avatar from '../../common/Avatar';
import './GlobalSearch.css';

const GlobalSearch = ({ isOpen, onClose, onChatSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    users: [],
    messages: []
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setAc