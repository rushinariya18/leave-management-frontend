import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type { User } from "../../interface/auth";
import { signinThunk, signoutThunk } from "./authThunks";

const TOKEN_KEY = "lm_token";
const USER_KEY = "lm_user";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const loadPersistedUser = (): User | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY),
  user: loadPersistedUser(),
  isAuthenticated: Boolean(localStorage.getItem(TOKEN_KEY)),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
    setUser: (state, action: { payload: User }) => {
      state.user = action.payload;
      localStorage.setItem(USER_KEY, JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem(TOKEN_KEY, action.payload.token);
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
        toast.success(`Welcome back, ${action.payload.user.name}`);
      })
      .addCase(signinThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signoutThunk.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
