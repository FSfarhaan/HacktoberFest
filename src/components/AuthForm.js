// src/components/AuthForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    token: "",
    year: "FE", // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/signup", {
        username: formData.username,
        password: formData.password,
        token: formData.token,
        year: formData.year, // Include year in signup data
      });
      alert(response.data.message);
      navigate("/upload"); // Redirect to upload page after signup
    } catch (error) {
      alert("Error signing up: " + error.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username: formData.username,
        password: formData.password,
      });

      // Storing in localStorage
      localStorage.setItem("token", response.data.token);
      alert("Login successful! Token:");
      navigate("/upload"); // Redirect to upload page after login
    } catch (error) {
      alert("Error logging in: " + error.response.data.message);
    }
  };

  return (
    <div className="bg-[#50DA4C] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#319C2E] shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-200 text-left">Username :</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-left">Password :</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {isSignup && (
            <>
              <div className="mb-4">
                <label className="block text-gray-200 text-left">Token :</label>
                <input
                  type="text"
                  name="token"
                  value={formData.token}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-200 text-left">Year :</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="FE">FE</option>
                  <option value="SE">SE</option>
                  <option value="TE">TE</option>
                  <option value="BE">BE</option>
                </select>
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-[#183717] text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-gray-200">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-700 hover:underline ml-1"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
