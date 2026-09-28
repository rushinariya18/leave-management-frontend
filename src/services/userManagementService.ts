import type { ApiResponse } from "../interface/api";
import type { User } from "../interface/auth";
import type {
  AssignManagerPayload,
  CreateUserPayload,
  ManagersListParams,
  ManagersListResponseData,
  UpdateUserStatusPayload,
  UserDetailData,
  UsersListParams,
  UsersListResponseData,
} from "../interface/user";
import { axiosInstance } from "./axiosInstance";

export const userManagementService = {
  list: (params: UsersListParams) =>
    axiosInstance.get<never, ApiResponse<UsersListResponseData>>("/users", { params }),

  create: (payload: CreateUserPayload) =>
    axiosInstance.post<never, ApiResponse<User>>("/users", payload),

  getById: (id: string) =>
    axiosInstance.get<never, ApiResponse<UserDetailData>>(`/users/${id}`),

  updateStatus: (id: string, payload: UpdateUserStatusPayload) =>
    axiosInstance.patch<never, ApiResponse<User>>(`/users/${id}/status`, payload),

  assignManager: (id: string, payload: AssignManagerPayload) =>
    axiosInstance.patch<never, ApiResponse<User>>(`/users/${id}/manager`, payload),

  listManagers: (params: ManagersListParams) =>
    axiosInstance.get<never, ApiResponse<ManagersListResponseData>>("/users/managers", {
      params,
    }),
};
