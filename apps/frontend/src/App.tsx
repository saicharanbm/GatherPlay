import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import SearchModel from "./components/SearchModel";
import Toast from "./components/Toast";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* <Toast /> */}
    </div>
  );
}

export default App;
