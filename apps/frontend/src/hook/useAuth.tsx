import { useEffect } from "react";
import { useAuthQuery } from "../services/queries";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  // Fetch auth data with caching
  const { data: userData, isLoading, isError, refetch } = useAuthQuery();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !userData) {
      navigate("/signup"); // Adjust the route as per your app
    }
  }, [isLoading, userData, navigate]);

  // Provide refetching or revalidation method
  const refreshAuth = async () => {
    await refetch();
  };

  return {
    userData,
    isLoading,
    isError,
    refreshAuth,
  };
};

export default useAuth;
