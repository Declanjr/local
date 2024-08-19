import React, { useState } from 'react';
import './forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // If the email is valid, proceed with your logic (e.g., API call)
    console.log('Email submitted:', email);

    // Clear the input and error
    setEmail('');
    setEmailError('');
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
       
        <h2>Forgot password</h2>
        <p>No worries, we’ll send you reset instructions.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailError ? 'input-error' : ''}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <button type="submit" className="reset-button">Reset password</button>
        </form>
        <a href="/login" className="back-to-login">← Back to log in</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
