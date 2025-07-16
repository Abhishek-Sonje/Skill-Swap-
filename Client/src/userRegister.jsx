import React from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const userData = {
      name: userName,
      role,
      learnSkills,
      teachSkills,
    };

    try {
      const response =await axios.post(
        "http://localhost:5000/api/users/register",
        userData
      );

      console.log("User registered successfully:", response.data);

      setIsSubmitted(true);
       navigate(`/dashboard/${response.data._id}`);
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user. Please try again.");
    }

    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#FDF6EE",
      padding: "20px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    wrapper: {
      maxWidth: "1000px",

      margin: "0 auto",
    },
    progressContainer: {
      marginBottom: "40px",
    },
    progressHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
    progressText: {
      color: "#333333",
      fontSize: "14px",
      fontWeight: "500",
    },
    progressBar: {
      width: "100%",
      height: "8px",
      backgroundColor: "#E0E0E0",
      borderRadius: "4px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#27BDBE",
      transition: "width 0.5s ease",
      width: `${(currentStep / 3) * 100}%`,
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
      padding: "40px",
      border: "1px solid #E0E0E0",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "600",
      color: "#1C1C1C",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#666666",
      lineHeight: "1.5",
    },
    stepContainer: {
      marginBottom: "32px",
    },
    input: {
      width: "100%",
      padding: "16px",
      fontSize: "16px",
      border: "2px solid #E0E0E0",
      borderRadius: "8px",
      outline: "none",
      transition: "border-color 0.3s ease",
      backgroundColor: "#FAFAFA",
    },
    inputFocused: {
      borderColor: "#27BDBE",
      backgroundColor: "white",
    },
    roleGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
      marginTop: "20px",
    },
    roleCard: {
      padding: "24px",
      border: "2px solid #E0E0E0",
      borderRadius: "8px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backgroundColor: "white",
    },
    roleCardSelected: {
      borderColor: "#27BDBE",
      backgroundColor: "#F0FDFD",
    },
    roleCardHover: {
      borderColor: "#27BDBE",
      transform: "translateY(-2px)",
    },
    roleEmoji: {
      fontSize: "32px",
      marginBottom: "12px",
      display: "block",
    },
    roleTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1C1C1C",
      marginBottom: "4px",
    },
    roleDescription: {
      fontSize: "14px",
      color: "#666666",
    },
    skillsSection: {
      marginBottom: "32px",
    },
    skillsTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1C1C1C",
      marginBottom: "16px",
    },
    skillsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "12px",
    },
    skillCard: {
      position: "relative",
      padding: "16px",
      border: "2px solid #E0E0E0",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backgroundColor: "white",
      textAlign: "center",
    },
    skillCardSelected: {
      borderColor: "#27BDBE",
      backgroundColor: "#F0FDFD",
    },
    skillCardHover: {
      borderColor: "#27BDBE",
      transform: "translateY(-1px)",
    },
    skillText: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#1C1C1C",
    },
    checkmark: {
      position: "absolute",
      top: "8px",
      right: "8px",
      width: "20px",
      height: "20px",
      backgroundColor: "#27BDBE",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    navigation: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "40px",
      paddingTop: "24px",
      borderTop: "1px solid #E0E0E0",
    },
    button: {
      padding: "12px 24px",
      borderRadius: "8px",
      border: "none",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      outline: "none",
    },
    buttonSecondary: {
      backgroundColor: "#E0E0E0",
      color: "#333333",
    },
    buttonSecondaryHover: {
      backgroundColor: "#D0D0D0",
    },
    buttonPrimary: {
      backgroundColor: "#27BDBE",
      color: "white",
    },
    buttonPrimaryHover: {
      backgroundColor: "#1FA5A6",
    },
    buttonAccent: {
      background: "linear-gradient(45deg, #F57C00, #FF9800)",
      color: "white",
    },
    buttonAccentHover: {
      background: "linear-gradient(45deg, #E65100, #F57C00)",
    },
    buttonDisabled: {
      backgroundColor: "#E0E0E0",
      color: "#999999",
      cursor: "not-allowed",
    },
    successContainer: {
      minHeight: "100vh",
      backgroundColor: "#FDF6EE",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    successCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "40px",
      textAlign: "center",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      border: "1px solid #E0E0E0",
    },
    successIcon: {
      width: "64px",
      height: "64px",
      backgroundColor: "#27BDBE",
      borderRadius: "50%",
      margin: "0 auto 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    successTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#1C1C1C",
      marginBottom: "8px",
    },
    successText: {
      fontSize: "16px",
      color: "#666666",
    },
  };

  const SkillGrid = ({ skills, selectedSkills, type, title }) => (
    <div style={styles.skillsSection}>
      <h3 style={styles.skillsTitle}>{title}</h3>
      <div style={styles.skillsGrid}>
        {skills.map((skill) => (
          <div
            key={skill}
            style={{
              ...styles.skillCard,
              ...(selectedSkills.includes(skill)
                ? styles.skillCardSelected
                : {}),
            }}
            onClick={() => handleCheckboxChange(skill, type)}
            onMouseEnter={(e) => {
              if (!selectedSkills.includes(skill)) {
                Object.assign(e.target.style, styles.skillCardHover);
              }
            }}
            onMouseLeave={(e) => {
              if (!selectedSkills.includes(skill)) {
                e.target.style.borderColor = "#E0E0E0";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            <span style={styles.skillText}>{skill}</span>
            {selectedSkills.includes(skill) && (
              <div style={styles.checkmark}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>
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
          <h2 style={styles.successTitle}>Registration Successful!</h2>
          <p style={styles.successText}>
            Welcome to the community, {userName}!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.progressContainer}>
          <div style={styles.progressHeader}>
            <span style={styles.progressText}>Step {currentStep} of 3</span>
            <span style={styles.progressText}>
              {Math.round((currentStep / 3) * 100)}% Complete
            </span>
          </div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill} />
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>{getStepTitle()}</h1>
            <p style={styles.subtitle}>
              Fill out the form to join our learning community
            </p>
          </div>

          <div>
            {currentStep === 1 && (
              <div style={styles.stepContainer}>
                <input
                  type="text"
                  value={userName}
                  placeholder="Enter your full name"
                  style={styles.input}
                  onChange={(e) => setUserName(e.target.value)}
                  onFocus={(e) =>
                    Object.assign(e.target.style, styles.inputFocused)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = "#E0E0E0";
                    e.target.style.backgroundColor = "#FAFAFA";
                  }}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div style={styles.stepContainer}>
                <div style={styles.roleGrid}>
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
                      style={{
                        ...styles.roleCard,
                        ...(role === item.key ? styles.roleCardSelected : {}),
                      }}
                      onClick={() => setRole(item.key)}
                      onMouseEnter={(e) => {
                        if (role !== item.key) {
                          Object.assign(e.target.style, styles.roleCardHover);
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (role !== item.key) {
                          e.target.style.borderColor = "#E0E0E0";
                          e.target.style.transform = "translateY(0)";
                        }
                      }}
                    >
                      <span style={styles.roleEmoji}>{item.emoji}</span>
                      <div style={styles.roleTitle}>{item.title}</div>
                      <div style={styles.roleDescription}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div style={styles.stepContainer}>
                {(role === "teacher" || role === "both") && (
                  <SkillGrid
                    skills={skillList}
                    selectedSkills={teachSkills}
                    type="teach"
                    title="🎯 Skills you want to teach"
                  />
                )}

                {(role === "learner" || role === "both") && (
                  <SkillGrid
                    skills={skillList}
                    selectedSkills={learnSkills}
                    type="learn"
                    title="📚 Skills you want to learn"
                  />
                )}
              </div>
            )}

            <div style={styles.navigation}>
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                style={{
                  ...styles.button,
                  ...(currentStep === 1
                    ? styles.buttonDisabled
                    : styles.buttonSecondary),
                }}
                onMouseEnter={(e) => {
                  if (currentStep !== 1) {
                    Object.assign(e.target.style, styles.buttonSecondaryHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentStep !== 1) {
                    Object.assign(e.target.style, styles.buttonSecondary);
                  }
                }}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  style={{
                    ...styles.button,
                    ...(canProceed()
                      ? styles.buttonPrimary
                      : styles.buttonDisabled),
                  }}
                  onMouseEnter={(e) => {
                    if (canProceed()) {
                      Object.assign(e.target.style, styles.buttonPrimaryHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (canProceed()) {
                      Object.assign(e.target.style, styles.buttonPrimary);
                    }
                  }}
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  style={{
                    ...styles.button,
                    ...styles.buttonAccent,
                  }}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, styles.buttonAccentHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, styles.buttonAccent)
                  }
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
