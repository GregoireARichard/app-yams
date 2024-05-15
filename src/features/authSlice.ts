import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  isAuthenticated: boolean;
  user: null | object;
  jwt: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  jwt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setAuthToken: (state, action) => {
      state.isAuthenticated = true;
      state.jwt = action.payload;

      const decoded = jwtDecode(action.payload);

      state.user = decoded;

      window.localStorage.setItem("YAMS:authToken", action.payload);
    },
  },
});

export const { login, logout, setAuthToken } = authSlice.actions;
export const selectAuth = (state: { auth: any }) => state.auth;
export default authSlice.reducer;
