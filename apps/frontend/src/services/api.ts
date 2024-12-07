import axios from "axios";
import { LoginData, SignupData } from "../types";

const baseURL = "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Correct way to include cookies
});

export const userSignup = (data: SignupData) => {
  return axiosInstance.post("/auth/signup", data);
};

export const userLogin = (data: LoginData) => {
  return axiosInstance.post("/auth/login", data);
};
