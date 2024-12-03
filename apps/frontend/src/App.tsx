import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-[#00050D] w-full min-h-screen pt-16">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
