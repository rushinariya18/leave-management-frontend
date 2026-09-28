import { createSlice } from "@reduxjs/toolkit";
import type { LeaveBalanceHistoryResponse, LeaveBalanceSummary } from "../../interface/leaveBalance";
import { fetchLeaveBalanceHistoryThunk, fetchMyLeaveBalancesThunk } from "./leaveBalancesThunks";

interface LeaveBalancesState {
  items: LeaveBalanceSummary[];
  itemsLoading: boolean;
  history: LeaveBalanceHistoryResponse | null;
  historyLoading: boolean;
}

const initialState: LeaveBalancesState = {
  items: [],
  itemsLoading: false,
  history: null,
  historyLoading: false,
};

const leaveBalancesSlice = createSlice({
  name: "leaveBalances",
  initialState,
  reducers: {
    clearLeaveBalanceHistory: (state) => {
      state.history = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyLeaveBalancesThunk.pending, (state) => {
        state.itemsLoading = true;
      })
      .addCase(fetchMyLeaveBalancesThunk.fulfilled, (state, action) => {
        state.itemsLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMyLeaveBalancesThunk.rejected, (state) => {
        state.itemsLoading = false;
      })
      .addCase(fetchLeaveBalanceHistoryThunk.pending, (state) => {
        state.historyLoading = true;
      })
      .addCase(fetchLeaveBalanceHistoryThunk.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.history = action.payload;
      })
      .addCase(fetchLeaveBalanceHistoryThunk.rejected, (state) => {
        state.historyLoading = false;
      });
  },
});

export const { clearLeaveBalanceHistory } = leaveBalancesSlice.actions;
export default leaveBalancesSlice.reducer;
