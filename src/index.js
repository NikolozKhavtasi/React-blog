import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignInSignUp from './SignInSignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-in" element={<SignInSignUp />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
