import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Auth.css';

const Register = () => {
  return (
    <div>
  
    <div className="auth-container">
      <Link to="/" className="back-button">← Back to Home</Link>
      <h2>Register</h2>
      <form className="auth-form">
        <input type="text" placeholder="Full Name" required />        
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn btn-blue">Register</button>
      </form>
      <p className="changeLogin-Register">Already have an account? <Link to="/login">Login here</Link></p>
    </div>
    </div>
  );
};

export default Register;
