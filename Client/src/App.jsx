import "./App.css";
import { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Pages
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/dashboard";
import ProfileSetup from "./pages/profileSetup";
import UserLogin from "./pages/userLogin";
import UserProfilePage from "./pages/UserProfilePage";

// Context & Components
import AppContext from "./context/AppContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./context/ProtectedRoute";
import ChatPage from "./components/ChatPage";

function App() {
  const { userData } = useContext(AppContext);
  const location = useLocation();

  // Hide Navbar on login and homepage
  const hideNavbar = ["/", "/login"].includes(location.pathname);

  return (
    <>
      {/* Show Navbar only if not on home or login */}
      {!hideNavbar && <Navbar userName={userData?.name || "User"} />}

      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/complete-profile" element={<ProfileSetup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/chat/:receiverId" element={<ChatPage/>} />
      </Routes>
    </>
  );
}

export default App;
