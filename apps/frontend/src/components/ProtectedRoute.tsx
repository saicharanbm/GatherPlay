import { useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Redirect to your login page
  };

  return (
    <div className="bg-gray-900 text-white flex items-center justify-center h-screen">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">This is a Protected Route</h1>
        <p className="text-lg">
          You need to be logged in to access this page. Please log in or sign
          up.
        </p>
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default ProtectedRoute;
