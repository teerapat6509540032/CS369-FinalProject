import React from 'react';
import { Link } from 'react-router-dom';

const NavbarActions = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar-right">
      {isLoggedIn ? (
        <>
          <Link to="/cart">🛒</Link>
          <button onClick={handleLogout} className="btn btn-outline-red">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="btn btn-outline-blue">Login</Link>
          <Link to="/design">
            <button className="btn btn-blue">Start Designing</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavbarActions;
