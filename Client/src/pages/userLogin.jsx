import React, { useContext, useState } from "react";
import "../styles/UserLogin.css";
import AppContext from "../context/AppContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (isLogin) {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );
        // await myInfo(); // Fetch user info after login
        console.log("Login successful:", data.user);

        if (data.success) {
          setIsLoggedin(true);
          setUserData(data.user);
          toast.success("Login successful!");
          if (!data.user.completed_profile) {
            navigate("/complete-profile");
          }
          else {
            navigate(`/dashboard`);
          }

        } else {
          toast.error("Login failed!", data.message);
        }
      } else {
        console.log("Signup attempt:", formData);
        const { data } = await axios.post(
          `${backendUrl}/api/auth/signup`,
          {
            name: formData.username,
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );

        if (data.success) {
          setIsLoggedin(true);
          setUserData(data.user);
          toast.success("Account created successfully!");
          if (!data.user.completed_profile) {
            navigate("/complete-profile");
          }
          else {
            navigate(`/dashboard`);
          }

        } else {
          console.error("Signup failed:", data.message);
          toast.error("Signup failed!", data.message);
        }
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      console.error("Error during authentication:", message);
      toast.error(message);
      setIsLoggedin(false);
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
            />
          </div>

          <button type="submit" className="submit-button">
            {isLogin ? "Sign In" : "Create Account"}
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
      </div>
    </div>
  );
}
