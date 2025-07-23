import React, { useState } from "react";
import "../styles/UserLogin.css";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [focusedField, setFocusedField] = useState("");

  // Mock user credentials for demonstration
  const mockUsers = [
    { email: "john@example.com", password: "password123" },
    { email: "jane@skillswap.com", password: "mypassword" },
    { email: "demo@demo.com", password: "demo1234" },
  ];

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
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

    // Clear general error message
    if (submitMessage && !submitMessage.includes("successful")) {
      setSubmitMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check credentials against mock users
      const user = mockUsers.find(
        (u) =>
          u.email.toLowerCase() === formData.email.toLowerCase() &&
          u.password === formData.password
      );

      if (user) {
        setSubmitMessage("Login successful! Welcome back to Skill Swap!");
        console.log("Login successful for:", formData.email);

        // Reset form after successful login
        setTimeout(() => {
          setFormData({ email: "", password: "" });
          setSubmitMessage("");
        }, 3000);
      } else {
        setSubmitMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Login failed. Please try again later.",error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-pattern"></div>
      <div className="login-card">
        <div className="header">
          <div className="logo-container">
            <div className="logo-glow"></div>
            <div className="logo">SS</div>
          </div>
          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Sign in to your Skill Swap account</p>
        </div>

        {/* Demo Credentials */}
        <div className="demo-credentials">
          <div className="demo-title">✨ Demo Credentials</div>
          <div>
            <strong>Email:</strong> demo@demo.com
          </div>
          <div>
            <strong>Password:</strong> demo1234
          </div>
        </div>

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

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              className={`form-input ${errors.email ? "error" : ""} ${
                focusedField === "email" ? "focused" : ""
              }`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && (
              <div className="error-message">⚠️ {errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                className={`form-input ${errors.password ? "error" : ""} ${
                  focusedField === "password" ? "focused" : ""
                }`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <div className="error-message">⚠️ {errors.password}</div>
            )}
          </div>

          {/* Forgot Password */}
          <div className="forgot-password-container">
            <a href="#" className="forgot-password">
              Forgot your password? →
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-btn ${isSubmitting ? "loading" : ""}`}
          >
            {isSubmitting ? "🔄 Signing In..." : "🚀 Sign In"}
          </button>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">or</span>
            <div className="divider-line"></div>
          </div>

          {/* Sign Up Link */}
          <div className="signup-link">
            New to Skill Swap?{" "}
            <a href="/register" className="signup-link-text">
              Create your account →
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
