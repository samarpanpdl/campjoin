import React from "react";
import "./UserCard.css";

const UserCard = () => (
  <div className="user-card">
    <div className="user-info">
      <div className="avatar-placeholder"></div>
      <div className="user-details">
        <div className="username">Username</div>
        <div className="stream">Stream, Year</div>
        <div className="college">College</div>
      </div>
      <div className="add-icon" title="Add Friend">
        ➕
      </div>
    </div>
    <div className="user-post-placeholder"></div>
  </div>
);

export default UserCard;
