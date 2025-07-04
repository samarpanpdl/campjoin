import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        console.log("No token found, redirecting to login");
        navigate('/login');
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
          navigate('/login');
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="app-main-layout">
        <Sidebar />
        <div className="main-content">
          {/* Top Card */}
          <div className="top-card">
            <div className="top-card-brain">🧠</div>
            <div className="top-card-text">
              Searching for the similar
              <br />
              minded people, Why not...
            </div>
            <div className="top-card-brain-right">🧠</div>
            <div className="top-card-buttons">
              <button className="top-card-button">Discover Colleges</button>
              <button className="top-card-button">Search Seniors</button>
            </div>
          </div>

          {/* Posts Row */}
          <div className="posts-row">
            {[1, 2].map((_, index) => (
              <div className="post-card" key={index}>
                <div className="post-header">
                  <div className="post-avatar">
                    <span className="add-icon">+</span>
                  </div>
                  <div className="post-info">
                    Username
                    <br />
                    Stream, Year
                    <br />
                    College
                  </div>
                </div>
                <div className="post-body"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="user-info">
        <h2>Welcome, {userData?.username || 'User'}!</h2>
        {userData ? (
          <div>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>First Name:</strong> {userData.first_name}</p>
            <p><strong>Last Name:</strong> {userData.last_name}</p>
            <p><strong>Phone:</strong> {userData.profile?.phone_number}</p>
            <p><strong>Age:</strong> {userData.profile?.age}</p>
            <p><strong>Join Year:</strong> {userData.profile?.join_year}</p>
            <p><strong>Pass Year:</strong> {userData.profile?.pass_year}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
