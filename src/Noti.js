// Notification.js
import React from 'react';
import './Notification.css'; // Adjust the path as necessary

function Notification({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">&times;</button>
    </div>
  );
}

export default Notification;
