import React, { useState, useContext } from "react";
import "../styles/profileSetup.css";
import { toast } from "react-toastify";
import AppContext from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { userData, setUserData, backendUrl } = useContext(AppContext);

  const [profileData, setProfileData] = useState({
    role: "",
    skillsToTeach: [],
    skillsToLearn: [],
  });

  // Sample skills
  const availableSkills = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Java",
    "C++",
    "PHP",
    "Ruby",
    "HTML/CSS",
    "TypeScript",
    "Angular",
    "Vue.js",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Git",
    "Machine Learning",
    "Data Science",
    "UI/UX Design",
    "Graphic Design",
    "Photography",
    "Video Editing",
    "Writing",
    "Marketing",
    "SEO",
    "Business Analytics",
    "Project Management",
    "Excel",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
    "Guitar",
    "Piano",
    "Cooking",
    "Fitness Training",
    "Yoga",
    "Public Speaking",
    "Leadership",
  ];

  const roles = [
    {
      id: "teacher",
      label: "Teacher",
      icon: "👨‍🏫",
      description: "Share your expertise with others",
      color: "#4CAF50",
    },
    {
      id: "learner",
      label: "Learner",
      icon: "👨‍🎓",
      description: "Learn new skills from the community",
      color: "#2196F3",
    },
    {
      id: "both",
      label: "Both",
      icon: "🔄",
      description: "Teach what you know, learn what you need",
      color: "#FF9800",
    },
  ];

  const handleRoleSelect = (roleId) => {
    setProfileData({
      ...profileData,
      role: roleId,
      skillsToTeach: [],
      skillsToLearn: [],
    });
  };

  const handleSkillToggle = (skill, type) => {
    setProfileData((prev) => ({
      ...prev,
      [type]: prev[type].includes(skill)
        ? prev[type].filter((s) => s !== skill)
        : [...prev[type], skill],
    }));
  };

  const handleSubmit = async () => {
    try {
      const completedProfile = {
        role: profileData.role,
        learnSkills: profileData.skillsToLearn,
        teachSkills: profileData.skillsToTeach,
        completed_profile: true,
      };
      const { data } = await axios.put(
        `${backendUrl}/api/users/update-profile`,
        completedProfile,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setUserData(data.user);
        toast.success("Profile setup completed successfully!");
        navigate(`/dashboard`);
      }
    } catch (err) {
      toast.error("Failed to complete profile setup. Please try again.");
      return;
    } 
  };

  const canComplete = () => {
    if (!profileData.role) return false;
    if (profileData.role === "teacher")
      return profileData.skillsToTeach.length > 0;
    if (profileData.role === "learner")
      return profileData.skillsToLearn.length > 0;
    if (profileData.role === "both")
      return (
        profileData.skillsToTeach.length > 0 &&
        profileData.skillsToLearn.length > 0
      );
    return false;
  };

  const selectedRole = roles.find((r) => r.id === profileData.role);

  // Renders a skills section (teach or learn) with color highlighting per role
  const renderSkillSection = (type, title, color) => {
    const skillsArray = profileData[type];
    return (
      <div className="ps-skill-section">
        <div className="ps-skill-section-header">
          <h3 className="ps-skill-section-title" style={{ color }}>
            {title}
          </h3>
          <span className="ps-skill-count">
            {skillsArray.length} skill{skillsArray.length !== 1 ? "s" : ""}{" "}
            selected
          </span>
        </div>
        {skillsArray.length > 0 && (
          <div className="ps-selected-skills">
            {skillsArray.map((skill) => (
              <span
                key={skill}
                className="ps-selected-skill"
                style={{ backgroundColor: color }}
              >
                {skill}
                <button
                  onClick={() => handleSkillToggle(skill, type)}
                  className="ps-remove-skill"
                  aria-label={`Remove ${skill}`}
                  type="button"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="ps-skills-grid">
          {availableSkills
            .filter((skill) => !skillsArray.includes(skill))
            .map((skill) => (
              <button
                key={skill}
                type="button"
                className="ps-skill-button"
                style={{ borderColor: color + "60" }}
                onClick={() => handleSkillToggle(skill, type)}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = color + "12")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                + {skill}
              </button>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="ps-container">
      <div className="ps-setup-card">
        <div className="ps-header">
          <h1 className="ps-logo">Complete Your Profile</h1>
          <p className="ps-subtitle">
            Set up your Skill Swap profile to get started
          </p>
        </div>

        {/* Role Selection */}
        <div className="ps-section">
          <h2 className="ps-section-title">Choose Your Role</h2>
          <div className="ps-role-grid">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`ps-role-card${
                  profileData.role === role.id ? " selected" : ""
                }`}
                style={
                  profileData.role === role.id
                    ? {
                        borderColor: role.color,
                        backgroundColor: role.color + "13",
                      }
                    : {}
                }
                onClick={() => handleRoleSelect(role.id)}
                tabIndex={0}
                role="button"
                aria-pressed={profileData.role === role.id}
              >
                <div className="ps-role-icon" style={{ color: role.color }}>
                  {role.icon}
                </div>
                <h3
                  className="ps-role-title"
                  style={{
                    color: profileData.role === role.id ? role.color : "#333",
                  }}
                >
                  {role.label}
                </h3>
                <p className="ps-role-description">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Selection */}
        {profileData.role && (
          <div className="ps-section">
            <div className="ps-skills-container">
              {(profileData.role === "teacher" ||
                profileData.role === "both") &&
                renderSkillSection(
                  "skillsToTeach",
                  "🎯 Skills I can teach",
                  "#4CAF50"
                )}
              {(profileData.role === "learner" ||
                profileData.role === "both") &&
                renderSkillSection(
                  "skillsToLearn",
                  "📚 Skills I want to learn",
                  "#2196F3"
                )}
            </div>
          </div>
        )}

        {/* Summary & Complete */}
        {profileData.role && (
          <div className="ps-section">
            <div className="ps-summary">
              <div className="ps-summary-header">
                <div className="ps-summary-role">
                  <span
                    className="ps-summary-role-icon"
                    style={{ color: selectedRole?.color }}
                  >
                    {selectedRole?.icon}
                  </span>
                  <span className="ps-summary-role-text">
                    You're joining as a <strong>{selectedRole?.label}</strong>
                  </span>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!canComplete()}
                  className={`ps-complete-btn${
                    canComplete() ? " enabled" : " disabled"
                  }`}
                  type="button"
                >
                  {canComplete()
                    ? "✓ Complete Profile"
                    : "Select skills to continue"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
