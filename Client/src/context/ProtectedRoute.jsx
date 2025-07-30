import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedin, loading } = useContext(AppContext);

  // Show loading screen while checking auth
  if (loading) {
    return <p style={{ textAlign: "center" }}>🔄 Checking authentication...</p>;
  }

  // If not logged in, redirect to login
  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the component
  return children;
};

export default ProtectedRoute;
