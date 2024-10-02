import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NavBar from "./Nav";

const Home = () => {
  const navigate = useNavigate();
  const [currentPr, setCurrentPr] = useState(0);
  const [dbPR, setdbPR] = useState(0);
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

  const fetchDBPR = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:4000/getdbPR', { token });
    const dbPr = response.data.dbPr;
    if(!dbPr) return;
    setdbPR(dbPr);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/auth');
      return ;
    } 

    fetchCurrentPr();
    fetchDBPR();
  });

  // Function to handle PR update
  const handleUpdatePr = async () => {
    // if (!newPrNumber) {
    //   setMessage('Please provide a new PR number.');
    //   return;
    // }
    if(dbPR < currentPr) {
      const token = localStorage.getItem('token');
      // if(newPrNumber <= currentPr) {
      //   setMessage('You can’t update PR.');
      //   return;
      // } 
  
      try {
        const response = await axios.post('http://localhost:4000/updatePR', {
          prNo: currentPr, // Send the new PR number
          token
        });
        setMessage(response.data.message);
        fetchDBPR(); // Refresh the PR number after update
      } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred');
      }
    } else {
      setMessage('Everything upto date')
    }
    
  };

  return (
    <>
      <NavBar/>
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-6 text-center p-4" style={{color: "#183717"}}>Hacktoberfest PR Tracker</h1>
        <p className="text-xl mb-8 text-white max-w-2xl text-center" style={{color: "#183717"}}>
          Celebrate open source contributions this Hacktoberfest! Track your pull requests and share your progress with the community.
        </p>

        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mb-8">
          <h2 className="text-3xl font-bold mb-4 text-green-800 text-left">Your Current Hacktoberfest PR:</h2>

          <h3 className="text-lg font-semibold text-green-600 text-left">Your accepted PR count:</h3>
          <p className="text-4xl font-bold text-green-500 text-left">{currentPr}</p>

          <h3 className="text-lg font-semibold text-green-600 text-left">Your DB PR count:</h3>
          <p className="text-4xl font-bold text-green-500 text-left">{dbPR}</p>

          <button
            onClick={handleUpdatePr}
            className="w-full text-white p-3 rounded-md hover:bg-green-700 transition duration-300 text-lg font-bold"
            style={{background: "#183717", marginTop: "1rem"}}
          >
            Update PR
          </button>

          {message && <p className="mt-4 text-red-500 text-center text-lg">{message}</p>}
        </div>

       
      </div>
    </>
  );
};

export default Home;
