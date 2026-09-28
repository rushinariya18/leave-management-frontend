export type Role = "EMPLOYEE" | "MANAGER" | "HR";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  managerId?: string | null;
  isActive?: boolean;
  joinDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface SigninResponseData {
  token: string;
  user: User;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface UpdateProfilePayload {
  name: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
