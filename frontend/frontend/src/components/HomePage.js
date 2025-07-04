import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "./HomePage.css";

const HomePage = () => (
  <div className="homepage-container">
    <Header />
    <div className="body-section">
      <Sidebar />
      <MainContent />
    </div>
  </div>
);

export default HomePage;
