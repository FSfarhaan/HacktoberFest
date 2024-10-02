// src/App.js
import React from "react";
import './App.css'; // Ensure this is included
import NavBar from "./components/Nav";  // Import the NavBar component
import Home from "./components/Home";  // Import the Home component
import AuthForm from "./components/AuthForm";  // Import your Auth component
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is authenticated

  return (
    <div className="App"> {/* Apply the .App class here */}
      <BrowserRouter>
        <NavBar /> {/* Include the NavBar here, only once */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* Set Home as the main route */}
          <Route path="/auth" element={<AuthForm />} />  {/* Authentication route */}
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
