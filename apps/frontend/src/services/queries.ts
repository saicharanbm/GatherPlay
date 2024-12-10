import { useQuery } from "@tanstack/react-query";
import { fetchMe, fetchMyChannel } from "./api";

export const useAuthQuery = () => {
  //   const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const response = await fetchMe(); // Fetch user data
      return response.data.message;
    },
    retry: false, // Disable automatic retries for better control
  });
};
export const useChannelQuery = () => {
  //   const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["channel", "me"],
    queryFn: async () => {
      const response = await fetchMyChannel(); // Fetch user data
      return response.data.message;
    },
    retry: false, // Disable automatic retries for better control
  });
};
