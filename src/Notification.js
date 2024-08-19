import React, { useEffect } from 'react';
import './Notification.css'; // Adjust the path as necessary

function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2000); // 2 seconds before auto close

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">&times;</button>
    </div>
  );
}

export default Notification;
