import React, { useState, useEffect, useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/AppContext";
import Avatar  from "react-nice-avatar";

import {
  ArrowLeft,
  Mail,
  BookOpen,
  GraduationCap,
  User,
  MessageCircle,
  Star,
  Award,
  Target,
  Sparkles,
  CheckCircle,
  Users,
} from "lucide-react";
import "../styles/UserProfilePage.css";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/users/${id}`, {
          withCredentials: true,
        });
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError("Profile not found. Please check the user ID.", err.message);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id,backendUrl]);

  const handleContact = () => {
    navigate(`/chat/${id}`);
  };
  const onBack = () => {
    navigate(-1);
  }
  const handleGoBack = () => (onBack ? onBack() : window.history.back());

  if (loading) {
    return (
      <div className="ppage-container">
        <div className="ppage-loading">
          <div className="ppage-spinner" />
          <p className="ppage-loading-text">Loading profile...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="ppage-container">
        <div className="ppage-error">
          <h2>Profile not found</h2>
          <button onClick={handleGoBack} className="ppage-contact-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ppage-container">
      {/* <Avatar {...profile.avatarConfig} style={{height:"40px",Zindex:"100"}}/> */}
      {/* Header */}
      <header className="ppage-header">
        <div className="ppage-floater floater-1" />
        <div className="ppage-floater floater-2" />
        <div className="ppage-header-inner">
          <button className="ppage-back-btn" onClick={handleGoBack}>
            <ArrowLeft size={20} />
            Back to Matches
          </button>
          <div className="ppage-profile-header">
            <div className="ppage-avatar">
              {/* <User size={48} /> */}
              <Avatar
                {...profile.avatarConfig}
                className="ppage-avatar-img"  
              />
            </div>
            <div className="ppage-profile-info">
              <h1 className="ppage-name">{profile?.name}</h1>
              <div className="ppage-role">
                {profile?.role === "both" ? (
                  <>
                    <Users size={16} className="inline-icon" />
                    Mentor & Learner
                  </>
                ) : profile?.role === "teacher" ? (
                  <>
                    <GraduationCap size={16} className="inline-icon" />
                    Teacher
                  </>
                ) : (
                  <>
                    <BookOpen size={16} className="inline-icon" />
                    Learner
                  </>
                )}
              </div>
              <div className="ppage-email">
                <Mail size={20} />
                <span>{profile?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="ppage-main-content">
        <div>
          {/* Teach Skills */}
          {profile?.teachSkills?.length > 0 && (
            <div className="ppage-card skills-card">
              <h2 className="ppage-card-title">
                <GraduationCap size={24} color="#667eea" />
                Skills I Can Teach
              </h2>
              <div className="ppage-skills-list">
                {profile.teachSkills.map((skill, ix) => (
                  <span
                    key={ix}
                    className="ppage-skill-tag ppage-skill-tag-teach"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Learn Skills */}
          {profile?.learnSkills?.length > 0 && (
            <div className="ppage-card skills-card">
              <h2 className="ppage-card-title">
                <Target size={24} color="#fcb69f" />
                Skills I Want to Learn
              </h2>
              <div className="ppage-skills-list">
                {profile.learnSkills.map((skill, ix) => (
                  <span
                    key={ix}
                    className="ppage-skill-tag ppage-skill-tag-learn"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Sidebar */}
        <div className="ppage-sidebar">
          <div className="ppage-card ppage-card-action">
            <Sparkles size={32} className="mb-1" />
            <h3 className="ppage-card-subtitle">Start Learning Together</h3>
            <p className="ppage-card-desc">
              Connect with {profile.name} to start your skill exchange journey!
            </p>
            <button className="ppage-contact-btn" onClick={handleContact}>
              <MessageCircle size={20} />
              Send Message
            </button>
            <div className="ppage-stats">
              <div className="ppage-stat-item">
                <span className="ppage-stat-num">
                  {profile.teachSkills?.length || 0}
                </span>
                <span className="ppage-stat-label">Can Teach</span>
              </div>
              <div className="ppage-stat-item">
                <span className="ppage-stat-num">
                  {profile.learnSkills?.length || 0}
                </span>
                <span className="ppage-stat-label">Wants to Learn</span>
              </div>
            </div>
          </div>
          <div className="ppage-card">
            <h3 className="ppage-card-title">
              <CheckCircle size={20} color="#10b981" />
              Profile Status
            </h3>
            <div className="ppage-status">
              <div
                className="ppage-status-dot"
                style={{
                  background: profile.completed_profile ? "#10b981" : "#f59e0b",
                }}
              />
              <span className="ppage-status-text">
                {profile.completed_profile
                  ? "Profile Complete"
                  : "Profile Incomplete"}
              </span>
            </div>
            <div className="ppage-verification">
              <Award size={16} color="#667eea" />
              <span>Verified Skill Swapper</span>
            </div>
          </div>
          <div className="ppage-card">
            <h3 className="ppage-card-title">
              <Star size={20} color="#f59e0b" />
              Match Score
            </h3>
            <div className="ppage-match-score">
              <div className="ppage-match-perc">92%</div>
              <p className="ppage-match-desc">
                Great compatibility! You both have complementary skills that
                make for an excellent exchange.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default UserProfilePage;
