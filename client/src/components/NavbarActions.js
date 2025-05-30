import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
const NavbarActions = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      window.location.reload();
    }
  };

  return (
    <div className="navbar-right">
      {isLoggedIn ? (
        <>
          <Link to="/cart"><img width={35} height={35} src='https://cdn.creazilla.com/icons/3216541/shopping-cart-icon-md.png' alt='cart-image'></img></Link>
          <Link to="/design">
            <button className="btn btn-blue">Start Designing</button>
          </Link>
          <button onClick={handleLogout} className="btn btn-outline-red">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="btn btn-outline-blue">Login</Link>
        </>
      )}
    </div>
  );
};

export default NavbarActions;
