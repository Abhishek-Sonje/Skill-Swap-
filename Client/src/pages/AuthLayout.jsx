import React from "react";
import "../styles/Auth.css";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-section">
          <h1 className="logo">Skill Swap</h1>
          <p className="tagline">Exchange skills, grow together</p>
        </div>

        <div className="auth-content">
          <h2 className="auth-title">{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
