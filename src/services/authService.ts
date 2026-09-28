import type { ApiResponse } from "../interface/api";
import type {
  ForgotPasswordPayload,
  ResendOtpPayload,
  ResetPasswordPayload,
  SigninPayload,
  SigninResponseData,
} from "../interface/auth";
import { axiosInstance } from "./axiosInstance";

export const authService = {
  signin: (payload: SigninPayload) =>
    axiosInstance.post<never, ApiResponse<SigninResponseData>>("/auth/signin", payload),

  signout: () => axiosInstance.post<never, ApiResponse<null>>("/auth/signout"),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    axiosInstance.post<never, ApiResponse<null>>("/auth/forgot-password", payload),

  resendOtp: (payload: ResendOtpPayload) =>
    axiosInstance.post<never, ApiResponse<null>>("/auth/resend-otp", payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    axiosInstance.post<never, ApiResponse<null>>("/auth/reset-password", payload),
};
