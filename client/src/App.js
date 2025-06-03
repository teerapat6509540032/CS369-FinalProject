import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Design from './pages/Design';
import Order from './pages/Order';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';

const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expirationTime = payload.exp * 1000;
  if( Date.now() >= expirationTime) {
    localStorage.removeItem('token');
    return true;
  }
  else{
    return false;
  }
}

const App = () => {
  const location = useLocation();  // ใช้เพื่อเช็คเส้นทางปัจจุบัน
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (
      location.pathname !== '/' &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      if (isTokenExpired(token)) {
        alert('Your token expired or you are not logged in. Please log in again.');
        navigate('/login', { replace: true });
      }
    }
  }, [location, isLoggedIn, navigate]);

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
      <Footer />
    </>
  );
};

export default App;
