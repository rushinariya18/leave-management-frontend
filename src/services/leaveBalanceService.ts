import type { ApiResponse } from "../interface/api";
import type {
  LeaveBalanceHistoryResponse,
  LeaveBalanceSummary,
} from "../interface/leaveBalance";
import { axiosInstance } from "./axiosInstance";

export const leaveBalanceService = {
  list: () =>
    axiosInstance.get<never, ApiResponse<LeaveBalanceSummary[]>>("/leave-balances/me"),

  getHistory: (leaveTypeId: string) =>
    axiosInstance.get<never, ApiResponse<LeaveBalanceHistoryResponse>>(
      `/leave-balances/me/${leaveTypeId}/history`,
    ),
};
