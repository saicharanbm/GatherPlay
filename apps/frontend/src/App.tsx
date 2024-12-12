import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import SearchModel from "./components/SearchModel";
import useAuth from "./hook/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData, isLoading, isError } = useAuth();
  const location = useLocation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Check if the current route is for Login or Signup
  const isAuthRoute = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="bg-[#00050D] w-full min-h-screen pt-16">
      <Navbar openModal={openModal} />

      {isLoading && <div className="text-white">Loading...</div>}

      {!isLoading && isError && !isAuthRoute && <ProtectedRoute />}

      {!isLoading && (!isError || isAuthRoute) && <Outlet />}

      {isModalOpen && (
        <div className="fixed inset-0 w-full h-screen flex pt-28 justify-center z-60">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-60"
            onClick={closeModal}
          ></div>
          <SearchModel />
        </div>
      )}
    </div>
  );
}

export default App;
