import "./App.css";
import React from "react";
import UserRegister from "./userRegister";
import Dashboard from "./dashboard";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Navbar userName={"User"} /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        {/* Example - add more routes if needed */}
        {/* <Route path="/" element={<HomePage />} /> */}
      </Routes>
    </>
  );
}

export default App;
