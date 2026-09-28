import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  LeaveBalanceHistoryResponse,
  LeaveBalanceSummary,
} from "../../interface/leaveBalance";
import { leaveBalanceService } from "../../services/leaveBalanceService";

export const fetchMyLeaveBalancesThunk = createAsyncThunk<LeaveBalanceSummary[], void>(
  "leaveBalances/fetchMyLeaveBalances",
  async () => {
    const response = await leaveBalanceService.list();
    return response.data;
  },
);

export const fetchLeaveBalanceHistoryThunk = createAsyncThunk<
  LeaveBalanceHistoryResponse,
  string
>("leaveBalances/fetchLeaveBalanceHistory", async (leaveTypeId) => {
  const response = await leaveBalanceService.getHistory(leaveTypeId);
  return response.data;
});
