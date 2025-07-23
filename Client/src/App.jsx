import "./App.css";
import React from "react";
import UserRegister from "./pages/userRegister";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import User from "./pages/UserProfilePage";
import UserLogin from "./pages/userLogin";
// import UserRegister from "./pages/UserRegister";
import { Routes, Route } from "react-router-dom";
// import { User } from "lucide-react";

function App() {
  return (
    <>
      {/* <Navbar userName={"User"} /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
