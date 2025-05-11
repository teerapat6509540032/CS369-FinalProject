import React from 'react';
import { Link } from 'react-router-dom';
import NavbarActions from './NavbarActions';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
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
      <NavbarActions isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </header>
  );
};

export default Navbar;
