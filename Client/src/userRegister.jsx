import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserRegister.css";
import SkillGrid from "./components/skillGrid";

const skillList = [
  "Web Development",
  "Graphic Design",
  "Public Speaking",
  "Data Analysis",
  "Digital Marketing",
  "UI/UX Design",
  "Photography",
  "Video Editing",
  "Project Management",
  "Copywriting",
  "Machine Learning",
  "Mobile App Development",
  "Cloud Computing",
  "Cybersecurity",
  "SEO Optimization",
  "Content Writing",
  "Game Development",
  "Blockchain Development",
  "Social Media Management",
  "Entrepreneurship",
];

function UserRegister() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = (skill, type) => {
    const update = (skills, setSkills) => {
      if (skills.includes(skill)) {
        setSkills(skills.filter((s) => s !== skill));
      } else {
        setSkills([...skills, skill]);
      }
    };

    if (type === "teach") {
      update(teachSkills, setTeachSkills);
    } else {
      update(learnSkills, setLearnSkills);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitted(true);
    const userData = {
      name: userName,
      role,
      learnSkills,
      teachSkills,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        userData
      );

      navigate(`/dashboard/${response.data._id}`);
    } catch (error) {
      setIsSubmitted(false);
      alert("Failed to register user. Please try again.", error);
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentStep((step) => step + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentStep((step) => step - 1);
  };

  const canProceed = () => {
    if (currentStep === 1) return userName.trim() !== "";
    if (currentStep === 2) return role !== "";
    return true;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Welcome! Let's get to know you";
      case 2:
        return "How would you describe yourself?";
      case 3:
        return "Select your skills";
      default:
        return "Registration";
    }
  };

  if (isSubmitted) {
    return (
      <div className="ur-success-container">
        <div className="ur-success-card">
          <div className="ur-success-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M26.667 8L12 22.667L5.333 16"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="ur-success-title">Registration Successful!</h2>
          <p className="ur-success-text">
            Welcome to the community, {userName}!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ur-container">
      <div className="ur-wrapper">
        <div className="ur-progress-container">
          <div className="ur-progress-header">
            <span className="ur-progress-text">Step {currentStep} of 3</span>
            <span className="ur-progress-text">
              {Math.round((currentStep / 3) * 100)}% Complete
            </span>
          </div>
          <div className="ur-progress-bar">
            <div
              className="ur-progress-fill"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="ur-card">
          <div className="ur-header">
            <h1 className="ur-title">{getStepTitle()}</h1>
            <p className="ur-subtitle">
              Fill out the form to join our learning community
            </p>
          </div>

          {/* Remove the form wrapper and handle each step individually */}
          <div>
            {currentStep === 1 && (
              <div className="ur-step-container">
                <input
                  type="text"
                  value={userName}
                  className="ur-input"
                  placeholder="Enter your full name"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="ur-step-container">
                <div className="ur-role-grid">
                  {[
                    {
                      key: "teacher",
                      emoji: "👨‍🏫",
                      title: "Teacher",
                      desc: "Share your expertise",
                    },
                    {
                      key: "learner",
                      emoji: "🎓",
                      title: "Learner",
                      desc: "Learn new skills",
                    },
                    {
                      key: "both",
                      emoji: "🤝",
                      title: "Both",
                      desc: "Teach and learn together",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className={`ur-role-card${
                        role === item.key ? " selected" : ""
                      }`}
                      onClick={() => setRole(item.key)}
                    >
                      <span className="ur-role-emoji">{item.emoji}</span>
                      <div className="ur-role-title">{item.title}</div>
                      <div className="ur-role-description">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="ur-step-container">
                {(role === "teacher" || role === "both") && (
                  <SkillGrid
                    skills={skillList}
                    selectedSkills={teachSkills}
                    type="teach"
                    title="🎯 Skills you want to teach"
                    handleCheckboxChange={handleCheckboxChange}
                  />
                )}

                {(role === "learner" || role === "both") && (
                  <SkillGrid
                    skills={skillList}
                    selectedSkills={learnSkills}
                    type="learn"
                    title="📚 Skills you want to learn"
                    handleCheckboxChange={handleCheckboxChange}
                  />
                )}
              </div>
            )}

            <div className="ur-navigation">
              <button
                type="button"
                onClick={prevStep}
                className="ur-button ur-button-secondary"
                disabled={currentStep === 1}
              >
                Previous
              </button>
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ur-button ur-button-primary"
                  disabled={!canProceed()}
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="ur-button ur-button-accent"
                  disabled={isSubmitted}
                >
                  Complete Registration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
