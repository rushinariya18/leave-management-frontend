import type { ApiResponse } from "../interface/api";
import type {
  AuditLogEntry,
  CreateLeaveRequestPayload,
  LeaveRequestDetail,
  MyLeaveRequest,
  TeamPendingRequest,
} from "../interface/leaveRequest";
import { axiosInstance } from "./axiosInstance";

export const leaveRequestService = {
  list: () =>
    axiosInstance.get<never, ApiResponse<MyLeaveRequest[]>>("/leave-requests/me"),

  getById: (id: string) =>
    axiosInstance.get<never, ApiResponse<LeaveRequestDetail>>(`/leave-requests/${id}`),

  getAuditLogs: (requestId: string) =>
    axiosInstance.get<never, ApiResponse<AuditLogEntry[]>>(
      `/leave-requests/${requestId}/audit-logs`,
    ),

  create: (payload: CreateLeaveRequestPayload) =>
    axiosInstance.post<never, ApiResponse<MyLeaveRequest>>("/leave-requests", payload),

  listTeamPending: () =>
    axiosInstance.get<never, ApiResponse<TeamPendingRequest[]>>("/leave-requests/team/pending"),

  approve: (id: string) =>
    axiosInstance.post<never, ApiResponse<MyLeaveRequest>>(`/leave-requests/${id}/approve`),

  reject: (id: string, reason: string) =>
    axiosInstance.post<never, ApiResponse<MyLeaveRequest>>(`/leave-requests/${id}/reject`, {
      reason,
    }),
};
