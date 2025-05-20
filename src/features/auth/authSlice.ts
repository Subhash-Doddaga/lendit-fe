import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const userData = localStorage.getItem("user");

const initialState: AuthState = userData
  ? { user: JSON.parse(userData), isAuthenticated: true }
  : { user: null, isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
