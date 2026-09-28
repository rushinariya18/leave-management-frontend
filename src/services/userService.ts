import type { ApiResponse } from "../interface/api";
import type { ChangePasswordPayload, UpdateProfilePayload, User } from "../interface/auth";
import { axiosInstance } from "./axiosInstance";

export const userService = {
  getMe: () => axiosInstance.get<never, ApiResponse<User>>("/users/me"),

  updateMe: (payload: UpdateProfilePayload) =>
    axiosInstance.patch<never, ApiResponse<User>>("/users/me", payload),

  changePassword: (payload: ChangePasswordPayload) =>
    axiosInstance.patch<never, ApiResponse<null>>("/users/me/password", payload),
};
