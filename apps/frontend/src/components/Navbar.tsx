import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Trigger when user scrolls down
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        isScrolled ? "h-14 bg-opacity-80" : "h-16 bg-opacity-50"
      } bg-[#262A2F] fixed top-0 w-full text-white flex items-center justify-between px-[5%] backdrop-blur-md transition-all duration-300 ease-in-out`}
    >
      <div className="flex space-x-12">
        {/* Logo Section */}
        <div className="icon">
          <h1 className="text-3xl font-Kanit">GatherPlay</h1>
        </div>

        {/* Navigation Links Section */}
        <div className="nav-links flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg p-1 rounded cursor-pointer ${
                isActive
                  ? "bg-white text-gray-800 opacity-50 font-semibold"
                  : "hover:bg-white hover:text-gray-800"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/channel"
            className={({ isActive }) =>
              `text-lg p-1 rounded cursor-pointer ${
                isActive
                  ? "bg-white text-gray-800 opacity-50"
                  : "hover:bg-white hover:text-gray-800"
              }`
            }
          >
            Channel
          </NavLink>
          <div className="w-[2px] h-6 bg-white"></div>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `text-lg p-1 rounded cursor-pointer ${
                isActive
                  ? "bg-white text-gray-800 opacity-50"
                  : "hover:bg-white hover:text-gray-800"
              }`
            }
          >
            Upload
          </NavLink>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center p-2 cursor-pointer hover:bg-white rounded-full hover:text-gray-800">
          <IoMdSearch className="w-6 h-6" />
        </div>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `text-lg p-1 rounded cursor-pointer ${
              isActive
                ? "bg-white text-gray-800 opacity-50 font-semibold"
                : "hover:bg-white hover:text-gray-800"
            }`
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `text-lg p-1 rounded cursor-pointer ${
              isActive
                ? "bg-white text-gray-800 opacity-50 font-semibold"
                : "hover:bg-white hover:text-gray-800"
            }`
          }
        >
          Signup
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
