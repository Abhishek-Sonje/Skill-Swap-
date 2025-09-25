import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import SkillSwaplogo from "../assets/SkillSwaplogo.png";
import axios from "axios";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const { isLoggedin, userData, setIsLoggedin, setUserData, backendUrl } =
    useContext(AppContext);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedin(false);
      setUserData(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed!");
    }
  };

  return (
    <>
      <nav className="nav-root">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img
              src={SkillSwaplogo}
              alt="SkillSwap Logo"
              className="nav-logo-img"
            />
            <span className="nav-logo-text">Skillhive</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>

            {isLoggedin && userData && (
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            )}

            <Link to="/about" className="nav-link">
              About
            </Link>

            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </div>

          {/* Profile / Login */}
          <div className="nav-profile">
            {isLoggedin && userData ? (
              <div
                className={`profile-btn ${dropdown ? "active" : ""}`}
                onClick={() => setDropdown(!dropdown)}
              >
                <FaUserCircle size={24} color="#667eea" />
                <span className="profile-name">{userData.name}</span>

                {dropdown && (
                  <div className="profile-dropdown">
                    <div className="dropdown-item bold primary">
                      {userData.name}
                    </div>
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      className="dropdown-item danger"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="mobile-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="mobile-menu-inner">
          <Link
            to="/"
            className="nav-link mobile"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {isLoggedin && userData && (
            <Link
              to="/dashboard"
              className="nav-link mobile"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          <Link
            to="/about"
            className="nav-link mobile"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          <Link
            to="/contact"
            className="nav-link mobile"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {isLoggedin && userData ? (
            <div className="mobile-dropdown">
              <div className="mobile-dropdown-name">{userData.name}</div>
              <Link
                to="/profile"
                className="dropdown-item mobile"
                onClick={() => setMenuOpen(false)}
              >
                My Profile
              </Link>
              <button
                className="dropdown-item mobile danger"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="login-btn mobile"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
