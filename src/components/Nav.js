import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#50DA4C] p-4 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between">
        {/* Ensure logo is vertically aligned and responsive */}
        <div className="flex items-center">
          <a href="/">
            <img
              src="https://hacktoberfest.com/_next/static/media/logo-hacktoberfest-11--green.dd2bc4ca.svg"
              alt="Hacktoberfest Logo"
              className="h-10 sm:h-12" // Responsive sizing
            />
          </a>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/')}
            className="text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Login / Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
