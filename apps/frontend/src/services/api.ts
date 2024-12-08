import axios from "axios";
import { queryClient } from "../main";

import { LoginData, SignupData } from "../types";

const baseURL = "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Correct way to include cookies
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (
//       error.response?.status === 401 &&
//       error.config &&
//       !error.config._retry
//     ) {
//       try {
//         const refreshResponse = await axios.post("/auth/get-token");
//         const newAccessToken = refreshResponse.data.message.token;

//         axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
//         error.config.headers.Authorization = `Bearer ${newAccessToken}`;
//         error.config._retry = true;

//         return axiosInstance(error.config); // Retry the failed request
//       } catch (refreshError) {
//         queryClient.setQueryData(["auth", "user"], null); // Clear cached user data
//         throw refreshError; // Re-throw to notify the caller
//       }
//     }
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response, // Return response for successful requests
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 status and specific error message
    if (
      error.response?.status === 401 &&
      (error.response?.data?.message === "Unauthorized: Token expired" ||
        error.response?.data?.message === "Unauthorized: No token provided") &&
      !originalRequest._retry // Ensure no infinite loops
    ) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Attempt to refresh the token
        const refreshResponse = await axiosInstance.post("/auth/get-token");

        const newAccessToken = refreshResponse.data.message.token;

        // Set new access token in headers
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Clear cached user data if refresh fails
        queryClient.setQueryData(["auth", "user"], null);

        throw refreshError; // Re-throw the error to notify the caller
      }
    }

    // Reject any other errors
    return Promise.reject(error);
  }
);

export const userSignup = (data: SignupData) => {
  return axiosInstance.post("/auth/signup", data);
};

export const userLogin = (data: LoginData) => {
  return axiosInstance.post("/auth/login", data);
};

export const fetchMe = () => {
  return axiosInstance.get("/auth/me");
};
export const userLogout = () => {
  return axiosInstance.post("/auth/logout");
};

export default axiosInstance;
