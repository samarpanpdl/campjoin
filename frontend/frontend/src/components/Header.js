import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
    setUserData(null);
    navigate('/login'); // ✅ this works now
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setUserData(null);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user-info/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        if (error.response?.status === 401) {
          setUserData(null);
          navigate('/login');
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <div>
      <div className="logo-bar">
        <span className="logo">LOGOTEXT</span>

        <nav className="auth-nav">
          {!userData ? (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </nav>
      </div>

      <div className="navbar-bar">
        <div className="navbar-avatar"></div>
        <div className="navbar-separator"></div>

        <nav className="nav">
          <div className="nav-item">🏠 Home</div>
          <div className="nav-item">🔍 Search</div>
          <div className="nav-item">🎓 Colleges</div>
          <div className="nav-item">🗺️ Discover</div>
          <div className="nav-item settings">⚙️</div>
          <div className="nav-item welcome">
            Welcome, <strong>{userData?.username || 'User'}</strong>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
