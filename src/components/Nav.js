import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  return (
    <nav className="bg-[#50DA4C] pt-8" style={{width: "80%", margin: "auto"}}>
      <div className="flex items-center justify-between">
        {/* Ensure logo is vertically aligned and responsive */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <a href="/" className="flex-shrink-0">
            <img
              src="../CSIlogo.png"
              alt="CSI Logo"
              className="h-8 sm:h-10 md:h-16" // Responsive sizing for logo
            />
          </a>

          <a href="/" className="flex-shrink-0">
            <img
              src="https://hacktoberfest.com/_next/static/media/logo-hacktoberfest-11--green.dd2bc4ca.svg"
              alt="Hacktoberfest Logo"
              className="h-8 sm:h-10 md:h-16" // Responsive sizing for logo
            />
          </a>
        </div>

        <div className="flex space-x-2 sm:space-x-4">
          {token && <button
            onClick={() => navigate('/')}
            className="px-2 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-gray-700 transition"
            style={{ color: "#183717", fontFamily: "monospace", fontSize: "1rem", sm: "1.5rem", md: "1.5rem" }} // Responsive font size
          >
            Home
          </button> }
          <button
            onClick={() => navigate('/auth')}
            className="px-3 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-gray-700 transition bg-[#183717] text-white"
            style={{ fontFamily: "monospace", fontSize: "1rem", sm: "1.5rem", md: "1.5rem" }} // Responsive font size and padding
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
