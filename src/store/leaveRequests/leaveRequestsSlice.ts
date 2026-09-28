import { createSlice } from "@reduxjs/toolkit";
import type {
  AuditLogEntry,
  LeaveRequestDetail,
  MyLeaveRequest,
  TeamPendingRequest,
} from "../../interface/leaveRequest";
import {
  approveLeaveRequestThunk,
  createLeaveRequestThunk,
  fetchLeaveRequestAuditLogsThunk,
  fetchLeaveRequestByIdThunk,
  fetchMyLeaveRequestsThunk,
  fetchTeamPendingRequestsThunk,
  rejectLeaveRequestThunk,
} from "./leaveRequestsThunks";

interface LeaveRequestsState {
  items: MyLeaveRequest[];
  itemsLoading: boolean;
  auditLogs: AuditLogEntry[] | null;
  auditLogsLoading: boolean;
  mutationLoading: boolean;
  teamPending: TeamPendingRequest[];
  teamPendingLoading: boolean;
  selectedRequest: LeaveRequestDetail | null;
  selectedRequestLoading: boolean;
}

const initialState: LeaveRequestsState = {
  items: [],
  itemsLoading: false,
  auditLogs: null,
  auditLogsLoading: false,
  mutationLoading: false,
  teamPending: [],
  teamPendingLoading: false,
  selectedRequest: null,
  selectedRequestLoading: false,
};

const leaveRequestsSlice = createSlice({
  name: "leaveRequests",
  initialState,
  reducers: {
    clearLeaveRequestAuditLogs: (state) => {
      state.auditLogs = null;
    },
    clearSelectedLeaveRequest: (state) => {
      state.selectedRequest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyLeaveRequestsThunk.pending, (state) => {
        state.itemsLoading = true;
      })
      .addCase(fetchMyLeaveRequestsThunk.fulfilled, (state, action) => {
        state.itemsLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMyLeaveRequestsThunk.rejected, (state) => {
        state.itemsLoading = false;
      })
      .addCase(fetchLeaveRequestAuditLogsThunk.pending, (state) => {
        state.auditLogsLoading = true;
      })
      .addCase(fetchLeaveRequestAuditLogsThunk.fulfilled, (state, action) => {
        state.auditLogsLoading = false;
        state.auditLogs = action.payload;
      })
      .addCase(fetchLeaveRequestAuditLogsThunk.rejected, (state) => {
        state.auditLogsLoading = false;
        state.auditLogs = [];
      })
      .addCase(fetchLeaveRequestByIdThunk.pending, (state) => {
        state.selectedRequestLoading = true;
      })
      .addCase(fetchLeaveRequestByIdThunk.fulfilled, (state, action) => {
        state.selectedRequestLoading = false;
        state.selectedRequest = action.payload;
      })
      .addCase(fetchLeaveRequestByIdThunk.rejected, (state) => {
        state.selectedRequestLoading = false;
      })
      .addCase(createLeaveRequestThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(createLeaveRequestThunk.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(createLeaveRequestThunk.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(fetchTeamPendingRequestsThunk.pending, (state) => {
        state.teamPendingLoading = true;
      })
      .addCase(fetchTeamPendingRequestsThunk.fulfilled, (state, action) => {
        state.teamPendingLoading = false;
        state.teamPending = action.payload;
      })
      .addCase(fetchTeamPendingRequestsThunk.rejected, (state) => {
        state.teamPendingLoading = false;
      })
      .addCase(approveLeaveRequestThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(approveLeaveRequestThunk.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.teamPending = state.teamPending.filter((r) => r.id !== action.payload);
        if (state.selectedRequest?.id === action.payload) {
          state.selectedRequest = null;
        }
      })
      .addCase(approveLeaveRequestThunk.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(rejectLeaveRequestThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(rejectLeaveRequestThunk.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.teamPending = state.teamPending.filter((r) => r.id !== action.payload);
        if (state.selectedRequest?.id === action.payload) {
          state.selectedRequest = null;
        }
      })
      .addCase(rejectLeaveRequestThunk.rejected, (state) => {
        state.mutationLoading = false;
      });
  },
});

export const { clearLeaveRequestAuditLogs, clearSelectedLeaveRequest } = leaveRequestsSlice.actions;
export default leaveRequestsSlice.reducer;
