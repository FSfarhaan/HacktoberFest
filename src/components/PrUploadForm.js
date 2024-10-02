// src/components/PrUploadForm.js
import React, { useState, useEffect } from 'react';
import { uploadPrNumber } from '../api'; // Ensure this function is correctly set up to handle both actions
import NavBar from './Nav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PrUploadForm = () => {
  const [username, setUsername] = useState('');
  const [currentPr, setCurrentPr] = useState(null);
  const [newPrNumber, setNewPrNumber] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch the current PR number from the server when the component mounts
  const fetchCurrentPr = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:4000/hacktoberfest', { token });
      setCurrentPr(response.data.pr); // Adjust based on your API response
    } catch (error) {
      console.error(error);
      setMessage('Error fetching PR number.');
    }
  };

  useEffect(() => {
    fetchCurrentPr();
  }, []);

  // Function to handle PR number update
  const handleUpdatePr = async (e) => {
    e.preventDefault();
    if (!newPrNumber) {
      setMessage('Please provide a new PR number.');
      return;
    }

    try {
      const data = await uploadPrNumber(username, newPrNumber); // Call the upload function
      setMessage(data.message);
      fetchCurrentPr(); // Refresh the PR number after update
      setNewPrNumber(''); // Clear input field after submission
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-[#50DA4C] min-h-screen flex flex-col items-center justify-center">
        <div className="bg-[#319C2E] shadow-md rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Your Hacktoberfest PR : </h2>

          {currentPr ? (
            <>
              <h1 className="text-lg font-semibold text-white">Your current PR number is:</h1>
              <p className="text-xl font-bold text-blue-200">{currentPr}</p>
            </>
          ) : (
            <p className="text-red-500">No current PR number found.</p>
          )}

          <form onSubmit={handleUpdatePr} className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Update PR Number:</h2>
            <input
              type="number"
              value={newPrNumber}
              onChange={(e) => setNewPrNumber(e.target.value)}
              placeholder="Enter your new PR number"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#183717] text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Update PR Number
            </button>
          </form>

          {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default PrUploadForm;
