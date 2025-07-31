import React, {  useState } from "react";
import {
  User,
  GraduationCap,
  BookOpen,
  Users,
  Star,
  MessageCircle,
  Zap,
  Target,
} from "lucide-react";
import "./card.css";
import {useNavigate} from "react-router-dom";

export default function UserCard({ match }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "teacher":
        return "role-badge teacher";
      case "learner":
        return "role-badge learner";
      case "both":
        return "role-badge both";
      default:
        return "role-badge default";
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

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i < fullStars ? "#fbbf24" : "none"}
          color={i < fullStars ? "#fbbf24" : "#d1d5db"}
          className="star-icon"
        />
      );
    }
    return stars;
  };

  const handleConnect = () => {
    console.log("Initiating connection with:", match.name);
    // Add your connection logic here
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "teacher":
        return <GraduationCap size={14} />;
      case "learner":
        return <BookOpen size={14} />;
      case "both":
        return <Users size={14} />;
      default:
        return <User size={14} />;
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case "teacher":
        return "Teacher";
      case "learner":
        return "Learner";
      case "both":
        return "Mentor";
      default:
        return "Unknown";
    }
  };

  const handleNavigate = () => {
    navigate(`/profile/${match._id}`)
  }

    return (
      <div
        className={`usercard-root ${isHovered ? "hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleNavigate}
      >
        <div className="gradient-overlay"></div>
        <div className="usercard-header">
          <div className="avatar" aria-label="user initials">
            {getInitials(match.name)}
          </div>
          <div className="user-info">
            <h3 className="user-name">{match.name || "Unknown User"}</h3>
            <div className="user-meta">
              <div className={getRoleBadgeClass(match.role)}>
                {getRoleIcon(match.role)}
                {getRoleText(match.role)}
              </div>
              <div className="rating">
                <div className="stars">{renderStars(match.rating)}</div>
                <span className="rating-value">{match.rating || "New"}</span>
                {match.students > 0 && (
                  <span className="connections">
                    • {match.students} connections
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {match.teachSkills?.length > 0 && (
          <div className="skills-section">
            <div className="skills-title">
              <Target size={16} color="#667eea" />
              <span>Can Teach</span>
            </div>
            <div className="skills-grid">
              {match.teachSkills.slice(0, 4).map((skill, index) => (
                <span key={index} className="skill-tag skill-tag-primary">
                  {skill}
                </span>
              ))}
              {match.teachSkills.length > 4 && (
                <span className="skill-tag skill-tag-primary skill-tag-more">
                  +{match.teachSkills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {match.learnSkills?.length > 0 && (
          <div className="skills-section">
            <div className="skills-title">
              <Zap size={16} color="#fcb69f" />
              <span>Wants to Learn</span>
            </div>
            <div className="skills-grid">
              {match.learnSkills.slice(0, 4).map((skill, index) => (
                <span key={index} className="skill-tag skill-tag-secondary">
                  {skill}
                </span>
              ))}
              {match.learnSkills.length > 4 && (
                <span className="skill-tag skill-tag-secondary skill-tag-more">
                  +{match.learnSkills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        <button className="connect-button" onClick={handleConnect}>
          <MessageCircle size={18} />
          Connect & Learn
        </button>
      </div>
    );
  }

