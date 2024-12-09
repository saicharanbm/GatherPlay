import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "./api";

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
