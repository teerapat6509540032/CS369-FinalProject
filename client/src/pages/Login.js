import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Auth.css';
const Login = ({ setIsLoggedIn }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="auth-container">
    <Link to="/" className="back-button">← Back to Home</Link>

      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn btn-blue">Login</button>
      </form>
      <p className="changeLogin-Register" >Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};


export default Login;
