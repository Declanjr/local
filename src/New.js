import React, { useState } from 'react';
import './New.css';
import Notification from './Notification';

const SetNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Save password to local storage
    localStorage.setItem('newPassword', value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Save confirmPassword to local storage
    localStorage.setItem('confirmPassword', value);
  };

  const handleResetPassword = () => {
    if (password.length < 8) {
      setNotification({ message: 'Password should be higher than 8 characters', type: 'error' });
      return;
    }
    if (password !== confirmPassword) {
      setNotification({ message: 'Passwords not matching', type: 'error' });
      return;
    }
    if (!password) {
      setNotification({ message: 'Password is required!', type: 'error' });
      return;
    }
    if (!confirmPassword) {
      setNotification({ message: 'Password is required!', type: 'error' });
      return;
    }

    setNotification({ message: 'Password reset successfully', type: 'success' });

    // Logic for password reset (e.g., API call) goes here
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="set-new-password-container">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />

      <div className="icon-container">
        <span className="lock-icon">🔒</span>
      </div>
      <h1>Set new password</h1>
      <p className="password-requirement">Must be at least 8 characters.</p>
      
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Password"
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Re-enter Password"
        />
      </div>
      
      <button className="reset-button" onClick={handleResetPassword}>
        Reset password
      </button>
      
      <a href="#" className="back-link">← Back to log in</a>
    </div>
  );
};

export default SetNewPassword;
