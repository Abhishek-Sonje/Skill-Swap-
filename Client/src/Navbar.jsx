import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import SkillSwaplogo from "./assets/SkillSwaplogo.png";
 // Assuming you have a logo image

function Navbar({ userName = "User" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  // Simulate user avatar initials
  const initials = (userName ?? "U")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  // Handle dropdown
  const handleLogout = () => {
    // TODO: Add logout logic here if needed
    navigate("/"); // Go back home
  };

  return (
    <nav className="nav-main">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon"><img src={SkillSwaplogo} alt="" /></span>
          <span>SkillSwap</span>
        </Link>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/dashboard/123"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>

        {/* Profile */}
        <div
          className="nav-profile"
          tabIndex={0}
          onClick={() => setDropdown((d) => !d)}
          onFocus={() => setDropdown(true)}
          onBlur={() => setDropdown(false)}
        >
          <div className="profile-avatar">
            <FaUserCircle size={28} />
            <span className="profile-name">{initials}</span>
          </div>
          {dropdown && (
            <div className="profile-dropdown">
              <span className="profile-dropdown-name">{userName}</span>
              <Link
                to="/profile"
                className="profile-dropdown-link"
                onClick={() => setDropdown(false)}
              >
                My Profile
              </Link>
              <button
                className="profile-dropdown-link logout"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
