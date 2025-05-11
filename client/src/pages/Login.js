import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
    <div className = "login-header"></div>
    <div className="auth-container">
      <Link to="/" className="back-button">← Back to Home</Link>
      <h2>Login</h2>
      <form className="auth-form">
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn btn-blue">Login</button>
      </form>
      <p className="changeLogin-Register">Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
    </div>
  );
};

export default Login;
