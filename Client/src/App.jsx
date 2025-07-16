import "./App.css";
import React from "react";
import UserRegister from "./userRegister";
import Dashboard from "./dashboard";
import { Routes,Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<UserRegister />} />
      <Route path="/dashboard/:id" element={<Dashboard />} />

    </Routes>
  );
}

export default App;
