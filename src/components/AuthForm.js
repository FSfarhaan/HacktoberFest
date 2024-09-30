// src/pages/Auth.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    token: "",
    prNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/signup", {
        username: formData.username,
        password: formData.password,
        token: formData.token,
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error signing up: " + error.response.data.message);
    }
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username: formData.username,
        password: formData.password,
      });

      // storing in localstorage
      localStorage.setItem("token", response.data.token);
      alert("Login successful! Token:");
      navigate("/");
      return;
    } catch (error) {
      alert("Error logging in: " + error.response.data.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {isSignup ? "Sign Up" : "Login"}
      </h2>
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
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
          <label className="block text-gray-700">Password</label>
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
          <div className="mb-4">
            <label className="block text-gray-700">Token</label>
            <input
              type="text"
              name="token"
              value={formData.token}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-500 hover:underline ml-1"
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
