import React, { useState } from "react";
import "../styles/userRegister.css";
import axios from "axios";

import { genConfig } from "react-nice-avatar";
import { useNavigate } from "react-router-dom";


const avatarConfig = genConfig();

const UserRegister = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    teachSkills: [],
    learnSkills: [],
  });

  const [errors, setErrors] = useState({});
  const [currentTeachSkill, setCurrentTeachSkill] = useState("");
  const [currentLearnSkill, setCurrentLearnSkill] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Mock database of registered emails
  const [registeredEmails] = useState([
    "john@example.com",
    "jane@skillswap.com",
    "test@demo.com",
  ]);

  const skillOptions = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Vue.js",
    "Angular",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Python",
    "Django",
    "Flask",
    "Java",
    "Spring Boot",
    "C++",
    "C#",
    "PHP",
    "Ruby on Rails",
    "Git",
    "GitHub",
    "REST APIs",
    "GraphQL",
    "Firebase",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Linux",
    "Webpack",
    "Next.js",
    "Tailwind CSS",
    "Bootstrap",
    "SASS/SCSS",
    "Figma",
    "UI/UX Design",
    "Data Structures",
    "Algorithms",
    "Machine Learning",
    "TensorFlow",
    "Pandas",
    "NumPy",
    "Data Analysis",
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (registeredEmails.includes(formData.email.toLowerCase())) {
      newErrors.email =
        "This email is already registered. Please use a different email.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select your primary role";
    }

    // Skills validation
    if (formData.teachSkills.length === 0) {
      newErrors.teachSkills = "Please add at least one skill you can teach";
    }

    if (formData.learnSkills.length === 0) {
      newErrors.learnSkills = "Please add at least one skill you want to learn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const addSkill = (type) => {
    const currentSkill =
      type === "teach" ? currentTeachSkill : currentLearnSkill;
    const skillArray =
      type === "teach" ? formData.teachSkills : formData.learnSkills;

    if (currentSkill && !skillArray.includes(currentSkill)) {
      setFormData((prev) => ({
        ...prev,
        [`${type}Skills`]: [...skillArray, currentSkill],
      }));

      if (type === "teach") {
        setCurrentTeachSkill("");
      } else {
        setCurrentLearnSkill("");
      }

      // Clear error when skill is added
      if (errors[`${type}Skills`]) {
        setErrors((prev) => ({
          ...prev,
          [`${type}Skills`]: "",
        }));
      }
    }
  };

  const removeSkill = (type, skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [`${type}Skills`]: prev[`${type}Skills`].filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      let newUser = {
        name: formData.name,
        email: formData.email.toLowerCase(),
        password: formData.password,
        role: formData.role,
        teachSkills: formData.teachSkills,
        learnSkills: formData.learnSkills,
        avatarConfig,
      }

      const saveUser = await axios.post(
        "http://localhost:5000/api/auth/register",
        newUser
      );
      
      if (saveUser.status === 201) {
        setSubmitMessage("Registration successful! Welcome to Skill Swap!");
        
        navigate(`/dashboard/${saveUser.data.user._id}`);
        // console.log("Registration data:", formData);
      } else {
        throw new Error("Registration failed");
      }

       
       
    } catch (error) {
      setSubmitMessage("Registration failed. Please try again.");
      console.error("Registration Error:", error);

    } 
  };

  return (
    <div className="registration-container">
      <div className="form-container">
        <div className="header">
          <h1 className="title">Join Skill Swap</h1>
          <p className="subtitle">Share your skills and learn from others</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="Enter your full name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? "error" : ""}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password *
            </label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? "error" : ""}`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          {/* Role Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="role">
              Primary Role *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`form-select ${errors.role ? "error" : ""}`}
            >
              <option value="">Select your primary role</option>
              <option value="teacher">Primarily want to teach</option>
              <option value="learner">Primarily want to learn</option>
              <option value="both">
                Equal interest in teaching and learning
              </option>
            </select>
            {errors.role && <div className="error-message">{errors.role}</div>}
          </div>

          {/* Skills to Teach */}
          <div className="form-group">
            <label className="form-label">Skills I Can Teach *</label>
            <div className="skill-input-container">
              <select
                value={currentTeachSkill}
                onChange={(e) => setCurrentTeachSkill(e.target.value)}
                className="skill-input-field"
              >
                <option value="">Select a skill to teach</option>
                {skillOptions
                  .filter((skill) => !formData.teachSkills.includes(skill))
                  .map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={() => addSkill("teach")}
                disabled={!currentTeachSkill}
                className={`add-skill-btn ${
                  !currentTeachSkill ? "disabled" : ""
                }`}
              >
                Add
              </button>
            </div>
            <div className="skill-tags">
              {formData.teachSkills.map((skill) => (
                <span key={skill} className="skill-tag teach-skill">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill("teach", skill)}
                    className="remove-skill-btn"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.teachSkills && (
              <div className="error-message">{errors.teachSkills}</div>
            )}
          </div>

          {/* Skills to Learn */}
          <div className="form-group">
            <label className="form-label">Skills I Want to Learn *</label>
            <div className="skill-input-container">
              <select
                value={currentLearnSkill}
                onChange={(e) => setCurrentLearnSkill(e.target.value)}
                className="skill-input-field"
              >
                <option value="">Select a skill to learn</option>
                {skillOptions
                  .filter((skill) => !formData.learnSkills.includes(skill))
                  .map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={() => addSkill("learn")}
                disabled={!currentLearnSkill}
                className={`add-skill-btn ${
                  !currentLearnSkill ? "disabled" : ""
                }`}
              >
                Add
              </button>
            </div>
            <div className="skill-tags">
              {formData.learnSkills.map((skill) => (
                <span key={skill} className="skill-tag learn-skill">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill("learn", skill)}
                    className="remove-skill-btn learn-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.learnSkills && (
              <div className="error-message">{errors.learnSkills}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-btn ${isSubmitting ? "loading" : ""}`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          {/* Success/Error Message */}
          {submitMessage && (
            <div
              className={`message ${
                submitMessage.includes("successful") ? "success" : "error"
              }`}
            >
              {submitMessage}
            </div>
          )}

          {/* Login Link */}
          <div className="login-link">
            Already have account?{" "}
            <a href="/login" className="login-link-text">
              Log in →
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
