import { useMutation } from "@tanstack/react-query";
import { LoginData, SignupData } from "../types";
import { userSignup, userLogin } from "./api";

export const usePostSignup = () =>
  useMutation({ mutationFn: async (data: SignupData) => userSignup(data) });

export const usePostLogin = () =>
  useMutation({
    mutationFn: async (data: LoginData) => userLogin(data),
  });
