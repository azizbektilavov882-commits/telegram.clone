import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = '#0088cc' }) => {
  return (
    <div className={`loading-spinner ${size}`}>
      <div 
        className="spinner" 
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;