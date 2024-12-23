import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import UserModal from "./UserModal";

type NavbarProps = {
  openModal: () => void;
  closeModal: () => void;
  userData?: { avatarUrl: string };
};

const Navbar = ({ openModal, closeModal, userData }: NavbarProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any existing timer
    }
    setDropdownOpen(true); // Open dropdown
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false); // Close dropdown after delay
    }, 300); // Adjust the delay time as needed
  };

  const defaultAvatar =
    "https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-2.png";

  return (
    <nav className="h-16 bg-[rgba(25,30,37,.8)] fixed top-0 w-full text-white flex items-center justify-between px-[5%] backdrop-blur-16 z-50">
      <div className="flex space-x-12">
        {/* Logo Section */}
        <div className="icon">
          <h1 className="text-3xl font-Kanit">GatherPlay</h1>
        </div>

        {/* Navigation Links Section */}
        <div className="nav-links flex items-center space-x-4">
          {["/", "/channel", "/upload"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              onClick={closeModal} // Close modal on navigation
              className={({ isActive }) =>
                `text-lg p-1 rounded cursor-pointer ${
                  isActive
                    ? "bg-white text-gray-800 opacity-50 font-semibold"
                    : "hover:bg-white hover:text-gray-800"
                }`
              }
            >
              {path === "/"
                ? "Home"
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}
          <div className="w-[2px] h-6 bg-white"></div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Modal */}
        <div
          className="flex items-center p-2 cursor-pointer hover:bg-white rounded-full hover:text-gray-800"
          onClick={openModal}
        >
          <IoMdSearch className="w-6 h-6" />
        </div>

        {/* User Authentication Section */}
        {userData ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`rounded-full p-1 cursor-pointer ${isDropdownOpen && "bg-white"} transform duration-200 ease-in-out`}
            >
              <img
                src={userData?.avatarUrl || defaultAvatar}
                alt="profile picture"
                className="w-10 h-10 rounded-full"
              />
            </div>
            {isDropdownOpen && <UserModal />}
          </div>
        ) : (
          <>
            {["/login", "/signup"].map((authPath, index) => (
              <NavLink
                key={index}
                to={authPath}
                onClick={closeModal} // Close modal on navigation
                className={({ isActive }) =>
                  `text-lg p-1 rounded cursor-pointer ${
                    isActive
                      ? "bg-white text-gray-800 opacity-50 font-semibold"
                      : "hover:bg-white hover:text-gray-800"
                  }`
                }
              >
                {authPath === "/login" ? "Login" : "Signup"}
              </NavLink>
            ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
