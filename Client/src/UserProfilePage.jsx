import "./UserProfilePage.css";
import React, { useCallback, useEffect, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const config = genConfig();
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  BookOpen,
  Users,
  Award,
  Heart,
  Share2,
  MoreHorizontal,
  Video,
  Clock,
  CheckCircle,
  ThumbsUp,
  Eye,
  Badge,
} from "lucide-react";

function UserProfilePage() {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let id = useParams().id;

  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load user information. Please try again."
      );
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  if (loading) {
    return (
      <div className="UserProfilePage-loading">
        <ScaleLoader height={45} margin={5} radius={7} width={6} />
        <p className="loading-text">Loading your matches...</p>
      </div>
    );
  }

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchUserInfo();
  };
  if (error) {
    return (
      <div className="dashboard-error">
        {error}
        <button
          className="retry-button"
          onClick={handleRetry}
          role="button"
          aria-label="Retry loading matches"
        >
          Retry
        </button>
      </div>
    );
  }

  // const user = {
  //   name: "Sarah Chen",
  //   title: "UX Designer & Photography Enthusiast",
  //   location: "San Francisco, CA",
  //   joinDate: "March 2024",
  //   profileImage: "/api/placeholder/150/150",
  //   rating: 4.9,
  //   reviewCount: 127,
  //   completedSessions: 89,
  //   responseTime: "2 hours",
  //   isOnline: true,
  //   bio: "Passionate designer with 8+ years of experience creating user-centered digital experiences. I love sharing design knowledge and learning new creative skills. When I'm not designing, you'll find me capturing street photography around the city.",
  //   languages: ["English", "Mandarin", "Spanish"],
  //   timezone: "PST (UTC-8)",
  // };

  // const teachingSkills = [
  //   {
  //     name: "UX/UI Design",
  //     level: "Expert",
  //     sessions: 45,
  //     rating: 4.9,
  //     price: "$50/hr",
  //   },
  //   {
  //     name: "Figma",
  //     level: "Expert",
  //     sessions: 32,
  //     rating: 4.8,
  //     price: "$40/hr",
  //   },
  //   {
  //     name: "Design Systems",
  //     level: "Advanced",
  //     sessions: 18,
  //     rating: 5.0,
  //     price: "$60/hr",
  //   },
  //   {
  //     name: "User Research",
  //     level: "Advanced",
  //     sessions: 25,
  //     rating: 4.9,
  //     price: "$45/hr",
  //   },
  //   {
  //     name: "Photography",
  //     level: "Intermediate",
  //     sessions: 12,
  //     rating: 4.7,
  //     price: "$30/hr",
  //   },
  // ];

  // const learningSkills = [
  //   { name: "Web Development", level: "Beginner", priority: "High" },
  //   { name: "3D Modeling", level: "Beginner", priority: "Medium" },
  //   { name: "Spanish Conversation", level: "Intermediate", priority: "High" },
  //   { name: "Data Visualization", level: "Beginner", priority: "Low" },
  //   { name: "Video Editing", level: "Beginner", priority: "Medium" },
  // ];

  // const reviews = [
  //   {
  //     id: 1,
  //     reviewer: "Mike Johnson",
  //     rating: 5,
  //     date: "2 weeks ago",
  //     skill: "UX Design",
  //     comment:
  //       "Sarah is an incredible teacher! Her explanations are clear and she provides practical examples that really help solidify the concepts.",
  //   },
  //   {
  //     id: 2,
  //     reviewer: "Lisa Wang",
  //     rating: 5,
  //     date: "1 month ago",
  //     skill: "Figma",
  //     comment:
  //       "Learned so much about advanced Figma techniques. Sarah's patient teaching style made complex concepts easy to understand.",
  //   },
  //   {
  //     id: 3,
  //     reviewer: "David Miller",
  //     rating: 4,
  //     date: "1 month ago",
  //     skill: "Photography",
  //     comment:
  //       "Great introduction to street photography. Sarah shared some amazing tips about composition and lighting.",
  //   },
  // ];

  // const achievements = [
  //   {
  //     icon: <Award style={{ width: "20px", height: "20px" }} />,
  //     title: "Top Rated Teacher",
  //     description: "Maintained 4.8+ rating",
  //   },
  //   {
  //     icon: <Users style={{ width: "20px", height: "20px" }} />,
  //     title: "Community Favorite",
  //     description: "100+ successful matches",
  //   },
  //   {
  //     icon: <CheckCircle style={{ width: "20px", height: "20px" }} />,
  //     title: "Reliable Partner",
  //     description: "95% session completion rate",
  //   },
  //   {
  //     icon: <ThumbsUp style={{ width: "20px", height: "20px" }} />,
  //     title: "Quick Responder",
  //     description: "Responds within 2 hours",
  //   },
  // ];

  // For badge classes
  const getLevelClass = (level) => {
    switch (level) {
      case "Expert":
        return "userprofile-badge-expert";
      case "Advanced":
        return "userprofile-badge-advanced";
      case "Intermediate":
        return "userprofile-badge-intermediate";
      case "Beginner":
        return "userprofile-badge-beginner";
      default:
        return "userprofile-badge-beginner";
    }
  };
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "userprofile-priority-high";
      case "Medium":
        return "userprofile-priority-medium";
      case "Low":
        return "userprofile-priority-low";
      default:
        return "";
    }
  };

  return (
    <div className="userprofile-container">
      {/* Header */}
      <div className="userprofile-header">
        <div className="userprofile-header-content">
          <div className="userprofile-profile-section">
            {/* Profile Image and Basic Info */}
            <div className="userprofile-profile-image-container">
              <div className="userprofile-profile-image">
                <Avatar style={{ width: "8rem", height: "8rem" }} {...config} />
              </div>

              <div className="userprofile-profile-info">
                <div className="userprofile-profile-name">
                  <h1 className="userprofile-name-title">{user.name}</h1>
                  <Badge
                    style={{ width: "20px", height: "20px", color: "#4f46e5" }}
                  />
                </div>
                <p className="userprofile-job-title">
                  {user.role} {/* Example: UX Designer & Photography Enthusiast */}
                </p>

                {/* <div className="userprofile-profile-meta">
                  <div className="userprofile-meta-item">
                    <MapPin style={{ width: "16px", height: "16px" }} />
                    <span>{user.location}</span>
                  </div>
                  <div className="userprofile-meta-item">
                    <Calendar style={{ width: "16px", height: "16px" }} />
                    <span>Joined {user.joinDate}</span>
                  </div>
                  <div className="userprofile-meta-item">
                    <Clock style={{ width: "16px", height: "16px" }} />
                    <span>Responds in {user.responseTime}</span>
                  </div>
                </div> */}
{/* 
                <div className="userprofile-profile-stats">
                  <div className="userprofile-rating">
                    <Star
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#f59e0b",
                        fill: "#f59e0b",
                      }}
                    />
                    <span style={{ fontWeight: "600", color: "#1e293b" }}>
                      {user.rating}
                    </span>
                    <span style={{ color: "#64748b" }}>
                      ({user.reviewCount} reviews)
                    </span>
                  </div>
                  <div style={{ color: "#64748b" }}>
                    <span style={{ fontWeight: "600", color: "#1e293b" }}>
                      {user.completedSessions}
                    </span>{" "}
                    sessions completed
                  </div>
                </div> */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="userprofile-action-buttons">
              <button className="userprofile-button-primary">
                <MessageCircle style={{ width: "20px", height: "20px" }} />
                Send Message
              </button>
              <button className="userprofile-button-secondary">
                <Video style={{ width: "20px", height: "20px" }} />
                Video Call
              </button>
              <button
                className={`userprofile-button-follow${
                  isFollowing ? " following" : ""
                }`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <Heart
                  style={{
                    width: "20px",
                    height: "20px",
                    ...(isFollowing ? { fill: "currentColor" } : {}),
                  }}
                />
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button className="userprofile-button-more">
                <MoreHorizontal style={{ width: "20px", height: "20px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="userprofile-tabs-container">
        <div className="userprofile-tabs-content">
          <nav className="userprofile-tabs-list">
            {[
              {
                id: "overview",
                label: "Overview",
                icon: <Eye style={{ width: "16px", height: "16px" }} />,
              },
              {
                id: "teaching",
                label: "Teaching Skills",
                icon: <BookOpen style={{ width: "16px", height: "16px" }} />,
              },
              {
                id: "learning",
                label: "Learning Goals",
                icon: <Users style={{ width: "16px", height: "16px" }} />,
              },
              {
                id: "reviews",
                label: "Reviews",
                icon: <Star style={{ width: "16px", height: "16px" }} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`userprofile-tab${
                  activeTab === tab.id ? " active" : ""
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="userprofile-main-content">
        {/* Main Content Area */}
        <div>
          {activeTab === "overview" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* About Section */}
              <div className="userprofile-card">
                <h2 className="userprofile-card-title">About</h2>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.6",
                    marginBottom: "24px",
                  }}
                >
                  {/* {user.bio} */}
                </p>
                <div
                  style={{
                    display: "grid",
                    gap: "24px",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontWeight: 600,
                        color: "#1e293b",
                        marginBottom: "8px",
                      }}
                    >
                      Languages
                    </h3>
                    {/* <div className="userprofile-language-tags">
                      {user.languages.map((lang, index) => (
                        <span key={index} className="userprofile-language-tag">
                          {lang}
                        </span>
                      ))}
                    </div> */}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontWeight: 600,
                        color: "#1e293b",
                        marginBottom: "8px",
                      }}
                    >
                      Timezone
                    </h3>
                    <span style={{ color: "#64748b" }}>{user.timezone}</span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="userprofile-card">
                <h2 className="userprofile-card-title">Achievements</h2>
                {/* <div className="userprofile-achievement-grid">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="userprofile-achievement-item">
                      <div className="userprofile-achievement-icon">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="userprofile-achievement-title">
                          {achievement.title}
                        </h3>
                        <p className="userprofile-achievement-desc">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          )}

          {activeTab === "teaching" && (
            <div className="userprofile-card">
              <h2 className="userprofile-card-title">Skills I Can Teach</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {user.teachSkills.map((skill, index) => (
                  <div key={index} className="userprofile-skill-item">
                    <div className="userprofile-skill-header">
                      <h3 className="userprofile-skill-name">{skill}</h3>
                      <div className="userprofile-skill-tags">
                        <span
                          className={`userprofile-skill-badge ${getLevelClass(
                            skill.level
                          )}`}
                        >
                          {skill.level}
                        </span>
                        <span style={{ fontWeight: 600, color: "#4f46e5" }}>
                          {skill.price}
                        </span>
                      </div>
                    </div>
                    <div className="userprofile-skill-meta">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Star
                          style={{
                            width: "16px",
                            height: "16px",
                            color: "#f59e0b",
                            fill: "#f59e0b",
                          }}
                        />
                        <span>{skill.rating}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <BookOpen style={{ width: "16px", height: "16px" }} />
                        <span>{skill.sessions} sessions</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "learning" && (
            <div className="userprofile-card">
              <h2 className="userprofile-card-title">Skills I Want to Learn</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                 
                {user.learnSkills.map((skill,index) => (
                  <div key={index} className="userprofile-skill-item">
                    <div className="userprofile-skill-header">
                      <h3 className="userprofile-skill-name">{skill}</h3>
                      <div className="userprofile-skill-tags">
                        <span
                          className={`userprofile-skill-badge ${getLevelClass(
                            skill.level
                          )}`}
                        >
                          Current: {skill.level}
                        </span>
                        <span
                          className={`userprofile-skill-badge ${getPriorityClass(
                            skill.priority
                          )}`}
                        >
                          {skill.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="userprofile-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <h2 className="userprofile-card-title">
                  Reviews ({user.reviewCount})
                </h2>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Star
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#f59e0b",
                      fill: "#f59e0b",
                    }}
                  />
                  <span style={{ fontWeight: 600, color: "#1e293b" }}>
                    {user.rating}
                  </span>
                  <span style={{ color: "#64748b" }}>average rating</span>
                </div>
              </div>
              {/* <div>
                {reviews.map((review) => (
                  <div key={review.id} className="userprofile-review-item">
                    <div className="userprofile-review-header">
                      <div className="userprofile-reviewer-info">
                        <div className="userprofile-reviewer-avatar">
                          <span>{review.reviewer[0]}</span>
                        </div>
                        <div>
                          <h4 className="userprofile-reviewer-name">
                            {review.reviewer}
                          </h4>
                          <p className="userprofile-review-meta">
                            {review.date} • {review.skill}
                          </p>
                        </div>
                      </div>
                      <div className="userprofile-review-stars">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            style={{
                              width: "16px",
                              height: "16px",
                              color: "#f59e0b",
                              fill: "#f59e0b",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="userprofile-review-text">{review.comment}</p>
                  </div>
                ))}
              </div> */}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="userprofile-sidebar">
          {/* Quick Contact */}
          <div className="userprofile-card">
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1e293b",
                marginBottom: "16px",
              }}
            >
              Quick Contact
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <button
                className="userprofile-quick-contact-button"
                style={{ backgroundColor: "#4f46e5", color: "white" }}
              >
                <MessageCircle style={{ width: "16px", height: "16px" }} />
                Send Message
              </button>
              <button
                className="userprofile-quick-contact-button"
                style={{ backgroundColor: "#0ea5e9", color: "white" }}
              >
                <Video style={{ width: "16px", height: "16px" }} />
                Schedule Call
              </button>
              <button
                className="userprofile-quick-contact-button"
                style={{
                  border: "2px solid #d1d5db",
                  backgroundColor: "white",
                  color: "#374151",
                }}
              >
                <Share2 style={{ width: "16px", height: "16px" }} />
                Share Profile
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="userprofile-card">
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1e293b",
                marginBottom: "16px",
              }}
            >
              Quick Stats
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div className="userprofile-stat-item">
                <span className="userprofile-stat-label">Response Rate</span>
                <span className="userprofile-stat-value">98%</span>
              </div>
              <div className="userprofile-stat-item">
                <span className="userprofile-stat-label">Teaching Hours</span>
                <span className="userprofile-stat-value">245h</span>
              </div>
              <div className="userprofile-stat-item">
                <span className="userprofile-stat-label">Students Taught</span>
                <span className="userprofile-stat-value">67</span>
              </div>
              <div className="userprofile-stat-item">
                <span className="userprofile-stat-label">Success Rate</span>
                <span className="userprofile-stat-value">95%</span>
              </div>
            </div>
          </div>

          {/* Safety Info */}
          <div className="userprofile-card userprofile-safety-card">
            <h3 className="userprofile-safety-title">Stay Safe</h3>
            <p className="userprofile-safety-text">
              Always use SkillSwap's messaging system for initial communications
              and keep personal information private.
            </p>
            <button className="userprofile-safety-link">
              Learn more about safety →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
