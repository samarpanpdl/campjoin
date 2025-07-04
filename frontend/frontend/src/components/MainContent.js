import React from "react";
import UserCard from "./UserCard";
import "./MainContent.css";

const MainContent = () => (
  <main className="main-content">
    <section className="search-section">
      <div className="search-message">
        <span className="brain-icon" role="img" aria-label="brain">
          🧠
        </span>
        <span>Searching for the similar minded people, Why not...</span>
        <span className="brain-icon" role="img" aria-label="brain">
          🧠
        </span>
      </div>
      <div className="search-buttons">
        <button className="discover-btn">Discover Colleges</button>
        <button className="seniors-btn">Search Seniors</button>
      </div>
    </section>
    <section className="user-cards-section">
      <UserCard />
      <UserCard />
    </section>
  </main>
);

export default MainContent;
