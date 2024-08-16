import React, { useState } from 'react';
import './App.css'; // Assuming you move the styles to an external CSS file or use inline styles
import { Link } from 'react-router-dom'; 

function LoginForm() {
  const [employeeID, setEmployeeID] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, like validating or sending data to a backend
    console.log({
      employeeID,
      password,
      rememberMe,
    });
  };

  return (
    <div className="centered-form">
      <div className="card">
        <div className="image_container mb-4">
          <img src="Assets/RRA_Logo_home.png" alt="Placeholder Image" className="img-fluid" style={{ maxHeight: '150px', objectFit: 'contain' }} />
        </div>
        <h1 className="text-blue-700 text-2xl font-serif mb-3">
          New Operating Model Portal
        </h1>
        <p className="font-serif font-bold mb-4 login_label">
          Login
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-icon">
            <div className="form-group mb-4">
              <i className="fas fa-user"></i>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Employee ID"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-icon">
            <div className="form-group mb-4">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-flex-align mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember Me
              </label>
            </div>
            <a href="#" className="forget">Forgot Password</a>
          </div>

          <button type="submit" className="btn btn-primary btn-signin">
            Sign In
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default LoginForm;
