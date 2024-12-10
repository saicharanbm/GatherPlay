import { NavLink } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { queryClient } from "../main";

function Navbar({ openModal }: { openModal: () => void }) {
  const userData = queryClient.getQueriesData({
    queryKey: ["auth"],
  })?.[0]?.[1] as { avatarUrl: string };
  console.log(userData);
  return (
    <nav className="h-16 bg-[rgba(25,30,37,.8)] fixed top-0  w-full text-white flex items-center justify-between px-[5%] backdrop-blur-16 z-50  ">
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
        <div
          className="flex items-center p-2 cursor-pointer hover:bg-white rounded-full hover:text-gray-800"
          onClick={() => openModal()}
        >
          <IoMdSearch className="w-6 h-6" />
        </div>
        {userData ? (
          <div className="rounded-full p-1 cursor-pointer hover:bg-white transform duration-200 ease-in-out">
            <img
              src={
                userData?.avatarUrl ||
                "https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-2.png"
              }
              alt="profile picture"
              className="w-10 h-10 rounded-full"
            />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
