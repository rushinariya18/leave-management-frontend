import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type {
  AuditLogEntry,
  CreateLeaveRequestPayload,
  LeaveRequestDetail,
  MyLeaveRequest,
  TeamPendingRequest,
} from "../../interface/leaveRequest";
import { leaveRequestService } from "../../services/leaveRequestService";

export const fetchMyLeaveRequestsThunk = createAsyncThunk<MyLeaveRequest[], void>(
  "leaveRequests/fetchMyLeaveRequests",
  async () => {
    const response = await leaveRequestService.list();
    return response.data;
  },
);

export const fetchLeaveRequestByIdThunk = createAsyncThunk<LeaveRequestDetail, string>(
  "leaveRequests/fetchLeaveRequestById",
  async (id) => {
    const response = await leaveRequestService.getById(id);
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

export const createLeaveRequestThunk = createAsyncThunk<
  MyLeaveRequest,
  CreateLeaveRequestPayload
>("leaveRequests/createLeaveRequest", async (payload) => {
  const response = await leaveRequestService.create(payload);
  toast.success(response.message);
  return response.data;
});

export const fetchTeamPendingRequestsThunk = createAsyncThunk<TeamPendingRequest[], void>(
  "leaveRequests/fetchTeamPendingRequests",
  async () => {
    const response = await leaveRequestService.listTeamPending();
    return response.data;
  },
);

export const approveLeaveRequestThunk = createAsyncThunk<string, string>(
  "leaveRequests/approveLeaveRequest",
  async (id) => {
    const response = await leaveRequestService.approve(id);
    toast.success(response.message);
    return id;
  },
);

export const rejectLeaveRequestThunk = createAsyncThunk<
  string,
  { id: string; reason: string }
>("leaveRequests/rejectLeaveRequest", async ({ id, reason }) => {
  const response = await leaveRequestService.reject(id, reason);
  toast.success(response.message);
  return id;
});
