import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type {
  ForgotPasswordPayload,
  ResendOtpPayload,
  ResetPasswordPayload,
  SigninPayload,
  SigninResponseData,
} from "../../interface/auth";
import { authService } from "../../services/authService";

export const signinThunk = createAsyncThunk<SigninResponseData, SigninPayload>(
  "auth/signin",
  async (payload) => {
    const response = await authService.signin(payload);
    return response.data;
  },
);

export const signoutThunk = createAsyncThunk("auth/signout", async () => {
  await authService.signout();
});

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (payload: ForgotPasswordPayload) => {
    const response = await authService.forgotPassword(payload);
    toast.success(response.message);
  },
);

export const resendOtpThunk = createAsyncThunk(
  "auth/resendOtp",
  async (payload: ResendOtpPayload) => {
    const response = await authService.resendOtp(payload);
    toast.success(response.message);
  },
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (payload: ResetPasswordPayload) => {
    const response = await authService.resetPassword(payload);
    toast.success(response.message);
  },
);
