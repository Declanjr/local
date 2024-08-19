import React, { useState, useRef } from 'react';
import './Reset.css';
import SetNewPassword from './New'; // Import the SetNewPassword component
import Notification from './Notification';
import { type } from 'express/lib/response';

const PasswordReset = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [isCodeValid, setIsCodeValid] = useState(false); // State to track code validation
  const email = 'amelie@untitledui.com';
  const inputRefs = useRef([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleCodeChange = (index, value) => {
    const numericValue = value.replace(/\D/, '');
    const newCode = [...code];
    newCode[index] = numericValue;
    setCode(newCode);

    if (numericValue && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!numericValue && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    // Save code to local storage
    localStorage.setItem('resetCode', newCode.join(''));
  };

  const handleContinue = () => {
    const enteredCode = code.join('');

    // Validate if the user entered all 4 digits
    if (enteredCode.length === 4) {
      setIsCodeValid(true);
    } else {
      setNotification({ message: 'Incomplete code', type: 'success' });
    }
  };

  const handleResend = () => {
    console.log('Resending code...');
    // Add your logic for resending the code here
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="password-reset-container">
       <Notification
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
      {!isCodeValid ? (
        <>
          <div className="icon-container">
            <i className="envelope-icon">✉️</i>
          </div>
          <h1>Password reset</h1>
          <p>Enter the code sent to {email}</p>
          <div className="code-input-container">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="code-input"
              />
            ))}
          </div>
          <button className="continue-button" onClick={handleContinue}>
            Continue
          </button>
          <p className="resend-text">
            Didn't receive the email? <span onClick={handleResend}>Click to resend</span>
          </p>
          <a href="#" className="back-link">← Back to log in</a>
        </>
      ) : (
        <SetNewPassword /> // Show the SetNewPassword component when code is validated
      )}
    </div>
  );
};

export default PasswordReset;
