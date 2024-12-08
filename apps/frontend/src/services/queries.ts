import { useQuery } from "@tanstack/react-query";
import api, { fetchMe } from "./api";
import axios from "axios";
import { queryClient } from "../main";

export const useAuthQuery = () => {
  //   const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      //   try {
      const response = await fetchMe(); // Fetch user data
      return response.data;
      //   } catch (error) {
      //     if (axios.isAxiosError(error) && error.response?.status === 401) {
      //       // Handle token refresh if access token is invalid
      //       try {
      //         const refreshResponse = await api.post("/auth/get-token");
      //         const newAccessToken = refreshResponse.data.message.token;

      //         // Update Axios with the new token
      //         api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

      //         // Retry the original request
      //         const retryResponse = await fetchMe();
      //         return retryResponse.data;
      //       } catch (refreshError) {
      //         console.error("Token refresh failed:", refreshError);
      //         queryClient.setQueryData(["auth", "user"], null); // Clear cached user data
      //         throw refreshError; // Ensure the error is propagated
      //       }
      //     }

      //     // Re-throw other errors to be handled by React Query
      //     throw error;
      //   }
    },
    retry: false, // Disable automatic retries for better control
  });
};
