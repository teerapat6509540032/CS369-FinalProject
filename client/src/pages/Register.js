import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    shippingAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        alert('Registration failed. Please check your details.');
        throw new Error('Registration failed. Please check your details.');
      }
      else {
        alert('Registration successful! You can now log in.');
      }

      const data = await response.json();
      console.log(data);

      window.location.href = '/login';
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  return (
    <div>
      <div className="auth-container">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h2>Register</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='Full Name'
              required
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder='Username'
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
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
            <input
              type="text"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              placeholder='Shipping Address'
              required
            />
          <button type="submit" className="btn btn-blue">Register</button>
        </form>
        <p className="changeLogin-Register">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
