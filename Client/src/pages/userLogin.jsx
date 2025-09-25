import React, { useContext, useState } from "react";
import "../styles/UserLogin.css";
import AppContext from "../context/AppContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Configure axios globally for this component
const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

export default function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData, userData } =
    useContext(AppContext);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("🚀 Auth attempt:", {
        isLogin,
        backendUrl,
        email: formData.email,
      });

      let response;

      if (isLogin) {
        console.log("📡 Making login request...");
        response = await api.post(`${backendUrl}/api/auth/login`, {
          email: formData.email,
          password: formData.password,
        });
      } else {
        console.log("📡 Making signup request...");
        response = await api.post(`${backendUrl}/api/auth/signup`, {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        });
      }

      console.log("✅ Auth response:", response.data);
      const { data } = response;

      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.user);
        toast.success(
          isLogin ? "Login successful!" : "Account created successfully!"
        );

        if (!data.user.completed_profile) {
          navigate("/complete-profile");
        } else {
          navigate("/dashboard");
        }
      } else {
        console.error("❌ Auth failed:", data.message);
        toast.error(data.message || "Authentication failed!");
      }
    } catch (error) {
      console.error("❌ Auth error:", error);

      // Better error handling
      let message = "An error occurred. Please try again.";

      if (error.response) {
        // Server responded with error status
        message =
          error.response.data?.message ||
          error.response.data?.error ||
          `Server error (${error.response.status})`;
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        message = "Network error. Please check your connection.";
        console.error("Network error:", error.request);
      } else {
        // Something else happened
        console.error("Request setup error:", error.message);
      }

      toast.error(message);
      setIsLoggedin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">Skill Swap</h1>
          <p className="auth-subtitle">
            {isLogin
              ? "Welcome back! Sign in to your account"
              : "Join our community of skill sharers"}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label className="input-label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="auth-input"
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="auth-input"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="auth-input"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading
              ? isLogin
                ? "Signing In..."
                : "Creating Account..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="toggle-section">
          <p className="toggle-text">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={toggleForm} className="toggle-link">
              {isLogin ? "Sign up here" : "Sign in here"}
            </span>
          </p>
        </div>

        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <div style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
            Backend URL: {backendUrl}
          </div>
        )}
      </div>
    </div>
  );
}
