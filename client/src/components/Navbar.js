import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
      <Link to="/"><div className="logo">DesignXpress</div></Link>
      </div>
      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/design">Design</Link>
        <Link to="/order">Order</Link>
        <Link to="/account">Account</Link>
      </nav>
      <div className="navbar-right">
      <Link to="/design"><button className="btn btn-blue">Start Designing</button></Link>
      </div>
    </header>
  );
};

export default Navbar;
