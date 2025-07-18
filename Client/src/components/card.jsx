import React, { useState } from "react";
import "../dashboard.css";

export default function UserCard({ match }) {
  const [isHovered, setIsHovered] = useState(false);

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "teacher":
        return "role-badge-teacher";
      case "learner":
        return "role-badge-learner";
      case "both":
        return "role-badge-both";
      default:
        return "role-badge-teacher";
    }
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "NA";
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half">⭐</span>);
    }
    return stars;
  };

  const handleConnect = () => {
    // TODO: Implement connection logic
    console.log("Initiating connection with:", match.name);
  };

  return (
    <div
      className={`dashboard-card ${isHovered ? "card-hover" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-gradient"></div>
      <div className="card-header">
        <div className="avatar">{getInitials(match.name)}</div>
        <div className="user-info">
          <h3 className="user-name">{match.name || "Unknown User"}</h3>
          <div className="user-meta">
            <span className={`role-badge ${getRoleBadgeClass(match.role)}`}>
              {match.role || "Unknown"}
            </span>
            <div className="rating">
              {renderStars(match.rating)}
              <span>{match.rating || "N/A"}</span>
              {match.students > 0 && <span>• {match.students} students</span>}
            </div>
          </div>
        </div>
      </div>
      {match.teachSkills?.length > 0 && (
        <div className="skills-section">
          <div className="skills-title">
            <span role="img" aria-label="Teaching">
              🎯
            </span>
            <span>Teaching</span>
          </div>
          <div className="skills-grid">
            {match.teachSkills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      {match.learnSkills?.length > 0 && (
        <div className="skills-section">
          <div className="skills-title">
            <span role="img" aria-label="Learning">
              📚
            </span>
            <span>Learning</span>
          </div>
          <div className="skills-grid">
            {match.learnSkills.map((skill, index) => (
              <span key={index} className="skill-tag-secondary">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      <button
        className={`connect-button ${isHovered ? "connect-button-hover" : ""}`}
        onClick={handleConnect}
        role="button"
        aria-label={`Connect with ${match.name || "user"} to swap skills`}
      >
        Connect & Learn
      </button>
    </div>
  );
}
