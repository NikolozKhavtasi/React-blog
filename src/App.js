import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Detail from './Detail';
import NavigationBar from './Navbar';

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem('authToken') || null);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('authToken', auth);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [auth]);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Login setAuth={setAuth} />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/detail/:id" element={auth ? <Detail /> : <Login setAuth={setAuth} />} />
      </Routes>
    </Router>
  );
};

export default App;
