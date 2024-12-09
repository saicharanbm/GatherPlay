import { useMutation } from "@tanstack/react-query";
import { LoginData, SignupData } from "../types";
import api, { userSignup, userLogin } from "./api";
import { queryClient } from "../main";

import axios from "axios";

export const usePostSignup = () => {
  return useMutation({
    mutationFn: async (data: SignupData) => {
      try {
        const response = await userSignup(data);
        return response.data.message;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Throw the server's error message
          throw error.response.data?.message || "An unknown error occurred";
        }
        // For non-Axios errors
        throw "An unexpected error occurred";
      }
    },
  });
};

export const usePostLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      try {
        const response = await userLogin(data);
        return response.data.message;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw error.response.data?.message || "An unknown error occurred";
        }
        throw "An unexpected error occurred";
      }
    },
    onSuccess: (data: { token: string }) => {
      const { token } = data;
      console.log("login sussessful from onSuccess listener.");
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Refetch user data or update global state
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
  });
};

export const usePostLogout = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await api.post("/auth/logout");
        return response.data.message;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw error.response.data?.message || "An unknown error occurred";
        }
        throw "An unexpected error occurred";
      }
    },
    onSuccess: () => {
      // Clear cached user data
      queryClient.setQueryData(["auth", "user"], null);

      // Remove the Authorization header
      api.defaults.headers.Authorization = null;
    },
  });
};
