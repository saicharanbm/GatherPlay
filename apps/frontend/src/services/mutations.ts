import { useMutation } from "@tanstack/react-query";
import { LoginData, SignupData } from "../types";
import { userSignup, userLogin } from "./api";
import axios from "axios";

export const usePostSignup = () =>
  useMutation({
    mutationFn: async (data: SignupData) => {
      try {
        const response = await userSignup(data);
        return response.data;
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

export const usePostLogin = () =>
  useMutation({
    mutationFn: async (data: LoginData) => {
      try {
        const response = await userLogin(data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw error.response.data?.message || "An unknown error occurred";
        }
        throw "An unexpected error occurred";
      }
    },
  });
