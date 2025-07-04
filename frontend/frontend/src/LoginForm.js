import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      username,
      password,
    });

    const { access, refresh } = response.data;

    // Save only access in memory (safer) or localStorage (simpler)
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    // Set default header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

    // Navigate to home page
    navigate('/home');
  } catch (err) {
    console.error('Login failed:', err);
    setError('Invalid credentials');
  }
};


  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
