// src/components/NavBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate = useNavigate()
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Hacktoberfest Tracker</h1>
        <button onClick={()=>navigate('/auth')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Action Button
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
