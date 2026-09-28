import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuditLogEntry, MyLeaveRequest } from "../../interface/leaveRequest";
import { leaveRequestService } from "../../services/leaveRequestService";

export const fetchMyLeaveRequestsThunk = createAsyncThunk<MyLeaveRequest[], void>(
  "leaveRequests/fetchMyLeaveRequests",
  async () => {
    const response = await leaveRequestService.list();
    return response.data;
  },
);

export const fetchLeaveRequestAuditLogsThunk = createAsyncThunk<AuditLogEntry[], string>(
  "leaveRequests/fetchLeaveRequestAuditLogs",
  async (requestId) => {
    const response = await leaveRequestService.getAuditLogs(requestId);
    return response.data;
  },
);
