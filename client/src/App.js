import React, { useState } from 'react';
import { Routes, Route, useLocation  } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Design from './pages/Design';
import Order from './pages/Order';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
    const location = useLocation();  // ใช้เพื่อเช็คเส้นทางปัจจุบัน
   const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
        {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/order" element={<Order />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      <Footer />
    </>
  );
};

export default App;
