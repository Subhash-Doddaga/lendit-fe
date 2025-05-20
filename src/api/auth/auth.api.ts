import axios from "../axios";
import { API } from "../endpoints";
import type { LoginRequest, SignupRequest, AuthResponse } from "./types";

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post(API.AUTH.LOGIN, data);
  return response.data;
};

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await axios.post(API.AUTH.SIGNUP, data);
  return response.data;
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await axios.post(API.AUTH.REFRESH);
  return response.data;
};

export const logout = async () => {
  await axios.post(API.AUTH.LOGOUT);
};
