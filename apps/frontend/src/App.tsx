import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import SearchModel from "./components/SearchModel";
import { useAuthQuery } from "./services/queries";
// import Toast from "./components/Toast";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user, isLoading, error } = useAuthQuery();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="bg-[#00050D] w-full min-h-screen pt-16 ">
      <Navbar openModal={openModal} />
      <Outlet />
      {isModalOpen && (
        <div className="fixed inset-0 w-full h-screen flex pt-28 justify-center z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-60"
            onClick={closeModal}
          ></div>
          <SearchModel />
        </div>
      )}
      {isLoading && <div className="text-white">Loading...</div>}

      {error && <div className="text-white">Error: {error.message}</div>}

      {user && <div className="text-white">{user.message.fullName}</div>}
    </div>
  );
}

export default App;
