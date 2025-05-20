import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  login as loginReducer,
  logout as logoutReducer,
} from "../../features/auth/authSlice";

import { login, signup, logout } from "./auth.api";
import { setAccessToken, clearAccessToken } from "../utils/token";
import type { LoginRequest, SignupRequest } from "./types";

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (res: any) => {
      let user: any = {
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        token: res.accessToken,
      };

      setAccessToken(res.accessToken);
      dispatch(loginReducer(user));
    },
  });
};

export const useSignup = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data: SignupRequest) => signup(data),
    onSuccess: (res: any) => {
      setAccessToken(res.accessToken);
      let user: any = {
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        token: res.accessToken,
      };
      dispatch(loginReducer(user));
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async () => {
      return Promise.resolve(true);
    },
    onSuccess: () => {
      clearAccessToken();
      dispatch(logoutReducer());
    },
  });
};
