// src/components/PrUploadForm.js
import React, { useState, useEffect } from "react";
import { uploadPrNumber } from "../api"; // Adjust this import as necessary
import NavBar from "./Nav";
import axios from "axios";

const PrUploadForm = () => {
  const [username, setUsername] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [message, setMessage] = useState("");
  const [pr, setPr] = useState(null);

  // Fetch current PR number when the component mounts
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("http://localhost:4000/hacktoberfest", {
        token,
      });
      setPr(response.data.pr); // Adjust based on your API response
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to upload the PR number
  const handleUpload = async () => {
    if (!username || !prNumber) {
      setMessage("Please provide both username and PR number.");
      return;
    }

    try {
      const data = await uploadPrNumber(username, prNumber);
      setMessage(data.message);
      fetchData(); // Refresh the PR number after upload
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Upload PR Number
          </h2>

          <h1 className="text-lg font-semibold">Your Hacktoberfest PR is:</h1>
          <p className="text-xl font-bold text-blue-600">{pr}</p>

          <div className="mt-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4"
            />
            <input
              type="number"
              value={prNumber}
              onChange={(e) => setPrNumber(e.target.value)}
              placeholder="Enter your PR number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4"
            />
            <button
              onClick={handleUpload}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Upload PR Number
            </button>
          </div>

          {message && (
            <p className="mt-4 text-red-500 text-center">{message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PrUploadForm;
