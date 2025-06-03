import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Auth.css';

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      window.location.href = '/';
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="auth-container">
      <Link to="/" className="back-button">← Back to Home</Link>

      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder='Username'
              required
            />
        <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              required
            />
        <button type="submit" className="btn btn-blue">Login</button>
      </form>
      <p className="changeLogin-Register" >Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};


export default Login;
