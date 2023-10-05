import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../login.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = JSON.parse(window.localStorage.getItem('x_user'))?.username;
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      setMessage(response.data.message);

      window.localStorage.setItem('x_user', JSON.stringify(response.data.user));

      if (response.data.message === 'Login successful') {
        const registrationResponse = await axios.post('http://localhost:5000/api/users/check-registration', { email: formData.email });

        if (registrationResponse.data.isRegistered) {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      setMessage('Login failed');
    }
  };

  return (
    <div className="wrapper sign-container">
      <div className="form-container login-form">
        <img src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg" alt="Twitter Logo" className="twitter-logo" />
        <h2>Sign in to X</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="buttons">Log in</button>
        </form>
        <p>{message}</p>
        <p className='text'>Don't have an account?{' '}
        <Link className='link' to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;