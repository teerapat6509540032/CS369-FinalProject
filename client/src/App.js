import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Design from './pages/Design';
import Order from './pages/Order';
import Account from './pages/Account';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/order" element={<Order />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
