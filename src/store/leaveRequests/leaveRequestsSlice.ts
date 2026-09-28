import { createSlice } from "@reduxjs/toolkit";
import type { AuditLogEntry, MyLeaveRequest } from "../../interface/leaveRequest";
import { fetchLeaveRequestAuditLogsThunk, fetchMyLeaveRequestsThunk } from "./leaveRequestsThunks";

interface LeaveRequestsState {
  items: MyLeaveRequest[];
  itemsLoading: boolean;
  auditLogs: AuditLogEntry[] | null;
  auditLogsLoading: boolean;
}

const initialState: LeaveRequestsState = {
  items: [],
  itemsLoading: false,
  auditLogs: null,
  auditLogsLoading: false,
};

const leaveRequestsSlice = createSlice({
  name: "leaveRequests",
  initialState,
  reducers: {
    clearLeaveRequestAuditLogs: (state) => {
      state.auditLogs = null;
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
      });
  },
});

export const { clearLeaveRequestAuditLogs } = leaveRequestsSlice.actions;
export default leaveRequestsSlice.reducer;
