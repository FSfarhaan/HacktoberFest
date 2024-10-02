import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [currentPr, setCurrentPr] = useState(null);
  const [newPrNumber, setNewPrNumber] = useState('');
  const [message, setMessage] = useState('');

  // Fetch current PR number when the component mounts
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

  // Function to handle PR update
  const handleUpdatePr = async (e) => {
    e.preventDefault();
    if (!newPrNumber) {
      setMessage('Please provide a new PR number.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/updatePr', {
        username,
        prNumber: newPrNumber,
      });
      setMessage(response.data.message);
      fetchCurrentPr(); // Refresh the PR number after update
      setNewPrNumber(''); // Clear input after submission
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="bg-[#50DA4C] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-1 text-white">Welcome to Hacktoberfest Tracker!</h1>
      <p className="text-lg mb-6 text-white">
        Join us in celebrating open source contributions this Hacktoberfest! 
        Track your pull requests and share your progress with the community.
      </p>

      <div className="bg-[#319C2E] shadow-md rounded-lg p-8 max-w-md w-full mb-6">
        <h2 className="text-2xl font-bold mb-4 text-white text-left">Your Hacktoberfest PR:</h2>

        {currentPr ? (
          <>
            <h1 className="text-lg font-semibold text-white text-left">Your current PR number is:</h1>
            <p className="text-xl font-bold text-blue-200 text-left">{currentPr}</p>
          </>
        ) : (
          <p className="text-red-500 text-left">No current PR number found.</p>
        )}
      </div>

      <div className="bg-[#319C2E] shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-white text-left">Your Current PR in Our Database:</h2>

        <form onSubmit={handleUpdatePr} className="mt-6">
          {currentPr ? (
            <>
              <h1 className="text-lg font-semibold text-white text-left">Your current PR number is:</h1>
              <p className="text-xl font-bold text-blue-200 text-left">{currentPr}</p>
            </>
          ) : (
            <p className="text-red-500 text-left">No current PR number found.</p>
          )}

          <h2 className="text-lg font-semibold mb-4 text-white text-left">Update PR Number:</h2>
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
            Update 
          </button>

          {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Home;
