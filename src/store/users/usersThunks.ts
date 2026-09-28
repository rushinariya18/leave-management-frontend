import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type { ChangePasswordPayload, UpdateProfilePayload } from "../../interface/auth";
import { userService } from "../../services/userService";
import { setUser } from "../auth/authSlice";

export const fetchCurrentUserThunk = createAsyncThunk(
  "users/fetchCurrentUser",
  async (_: void, { dispatch }) => {
    const response = await userService.getMe();
    dispatch(setUser(response.data));
    return response.data;
  },
);

export const updateProfileThunk = createAsyncThunk(
  "users/updateProfile",
  async (payload: UpdateProfilePayload, { dispatch }) => {
    const response = await userService.updateMe(payload);
    dispatch(setUser(response.data));
    toast.success(response.message);
    return response.data;
  },
);

export const changePasswordThunk = createAsyncThunk(
  "users/changePassword",
  async (payload: ChangePasswordPayload) => {
    const response = await userService.changePassword(payload);
    toast.success(response.message);
  },
);
