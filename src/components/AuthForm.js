// src/components/AuthForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./Nav";

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
      localStorage.setItem("token", formData.token);
      navigate("/"); // Redirect to upload page after signup
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
      navigate("/"); // Redirect to upload page after login
    } catch (error) {
      alert("Error logging in: " + error.response.data.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center mt-12"
      style={{ margin: "auto"}}>
        <div>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-6 text-center p-4"
          style={{color: "#183717", marginTop: "2rem"}}>
          {isSignup ? "Sign Up to participate in the event" : "Login your hacktoberfest account"}
        </h1>
          
          <form onSubmit={isSignup ? handleSignup : handleLogin} style={{padding: "1rem"}}>
            <div className="mb-4">
            <label className="block text-gray-200 text-left " style={{color: '#183717'}}>Enter your github username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                color="#183717"
                className="mt-1 block w-full rounded-md p-2 text-sm sm:text-base custom-placeholder focus:outline-none focus:border-green-600"
                style={{background: "transparent", border: "2px solid #183717"}}
              />
            </div>
            <div className="mb-4">
            <label className="block text-gray-200 text-left " style={{color: '#183717'}}>Enter password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md p-2 text-sm sm:text-base custom-placeholde focus:outline-none focus:border-green-600"
                style={{background: "transparent", border: "2px solid #183717"}}
              />
            </div>
            {isSignup && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-200 text-left"  style={{color: '#183717'}}>Token :</label>
                  <input
                    type="text"
                    name="token"
                    value={formData.token}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:border-green-600"
                    style={{background: "transparent", border: "2px solid #183717"}}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-200 text-left" style={{color: '#183717'}}>Year :</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md p-2 text-sm sm:text-base focus:outline-none focus:border-green-600"
                    style={{background: "transparent", border: "2px solid #183717"}}
                  >
                    <option value="FE" style={{background: "transparent", border: "2px solid #183717"}}>FE</option>
                    <option value="SE" style={{background: "transparent", border: "2px solid #183717"}}>SE</option>
                    <option value="TE" style={{background: "transparent", border: "2px solid #183717"}}>TE</option>
                    <option value="BE" style={{background: "transparent", border: "2px solid #183717"}}>BE</option>
                  </select>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-[#183717] text-white p-2 rounded-md hover:bg-green-600 transition duration-300 text-sm sm:text-base text-2xl sm:text-2xl  text-center  p-4"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>
          <p className=" text-sm sm:text-base" style={{color: "#183717"}}>
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
    </>
  );
  
};

export default Auth;
