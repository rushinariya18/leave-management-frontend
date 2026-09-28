import { createSlice } from "@reduxjs/toolkit";
import type { LeaveType } from "../../interface/leaveType";
import {
  createLeaveTypeThunk,
  deleteLeaveTypeThunk,
  fetchLeaveTypeByIdThunk,
  fetchLeaveTypesThunk,
  updateLeaveTypeThunk,
} from "./leaveTypesThunks";

interface LeaveTypesState {
  items: LeaveType[];
  itemsLoading: boolean;
  selected: LeaveType | null;
  selectedLoading: boolean;
  mutationLoading: boolean;
}

const initialState: LeaveTypesState = {
  items: [],
  itemsLoading: false,
  selected: null,
  selectedLoading: false,
  mutationLoading: false,
};

const leaveTypesSlice = createSlice({
  name: "leaveTypes",
  initialState,
  reducers: {
    clearSelectedLeaveType: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveTypesThunk.pending, (state) => {
        state.itemsLoading = true;
      })
      .addCase(fetchLeaveTypesThunk.fulfilled, (state, action) => {
        state.itemsLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchLeaveTypesThunk.rejected, (state) => {
        state.itemsLoading = false;
      })
      .addCase(fetchLeaveTypeByIdThunk.pending, (state) => {
        state.selectedLoading = true;
      })
      .addCase(fetchLeaveTypeByIdThunk.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchLeaveTypeByIdThunk.rejected, (state) => {
        state.selectedLoading = false;
      })
      .addCase(createLeaveTypeThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(createLeaveTypeThunk.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(createLeaveTypeThunk.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateLeaveTypeThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(updateLeaveTypeThunk.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateLeaveTypeThunk.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(deleteLeaveTypeThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(deleteLeaveTypeThunk.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(deleteLeaveTypeThunk.rejected, (state) => {
        state.mutationLoading = false;
      });
  },
});

export const { clearSelectedLeaveType } = leaveTypesSlice.actions;
export default leaveTypesSlice.reducer;
