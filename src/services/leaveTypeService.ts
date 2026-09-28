import type { ApiResponse } from "../interface/api";
import type {
  CreateLeaveTypePayload,
  LeaveType,
  UpdateLeaveTypePayload,
} from "../interface/leaveType";
import { axiosInstance } from "./axiosInstance";

export const leaveTypeService = {
  list: () => axiosInstance.get<never, ApiResponse<LeaveType[]>>("/leave-types"),

  getById: (id: string) =>
    axiosInstance.get<never, ApiResponse<LeaveType>>(`/leave-types/${id}`),

  create: (payload: CreateLeaveTypePayload) =>
    axiosInstance.post<never, ApiResponse<LeaveType>>("/leave-types", payload),

  update: (id: string, payload: UpdateLeaveTypePayload) =>
    axiosInstance.patch<never, ApiResponse<LeaveType>>(`/leave-types/${id}`, payload),

  remove: (id: string) =>
    axiosInstance.delete<never, ApiResponse<null>>(`/leave-types/${id}`),
};
