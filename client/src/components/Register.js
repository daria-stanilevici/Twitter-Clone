import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../login.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);

      setMessage(response.data.message);
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Registration failed');
    }
  };

  return (
    <div className="wrapper sign-container">
      <div className="form-container register-form">
        <img src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg" alt="Twitter Logo" className="twitter-logo" />
        <h2>Join X today</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}/>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}/>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}/>
          <button type="submit" className="buttons">Create account</button>
        </form>
        <p>{message}</p>
        <p className="text">Already have an account?{' '}
          <Link to="/login" className="link">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;