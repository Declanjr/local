// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Form from './scripts';
import './index.css';  // Import your global styles if necessary

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/app" element={<Form />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
