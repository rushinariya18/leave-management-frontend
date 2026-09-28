import type { ApiResponse } from "../interface/api";
import type { AuditLogEntry, MyLeaveRequest } from "../interface/leaveRequest";
import { axiosInstance } from "./axiosInstance";

export const leaveRequestService = {
  list: () =>
    axiosInstance.get<never, ApiResponse<MyLeaveRequest[]>>("/leave-requests/me"),

  getAuditLogs: (requestId: string) =>
    axiosInstance.get<never, ApiResponse<AuditLogEntry[]>>(
      `/leave-requests/${requestId}/audit-logs`,
    ),
};
