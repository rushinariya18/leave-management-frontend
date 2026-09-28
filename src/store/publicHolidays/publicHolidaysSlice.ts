import { createSlice } from "@reduxjs/toolkit";
import type { PublicHoliday } from "../../interface/publicHoliday";
import {
  createPublicHolidayThunk,
  deletePublicHolidayThunk,
  fetchPublicHolidaysThunk,
  updatePublicHolidayThunk,
} from "./publicHolidaysThunks";

interface PublicHolidaysState {
  items: PublicHoliday[];
  itemsLoading: boolean;
  mutationLoading: boolean;
}

const initialState: PublicHolidaysState = {
  items: [],
  itemsLoading: false,
  mutationLoading: false,
};

const publicHolidaysSlice = createSlice({
  name: "publicHolidays",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicHolidaysThunk.pending, (state) => {
        state.itemsLoading = true;
      })
      .addCase(fetchPublicHolidaysThunk.fulfilled, (state, action) => {
        state.itemsLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPublicHolidaysThunk.rejected, (state) => {
        state.itemsLoading = false;
      })
      .addCase(createPublicHolidayThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(createPublicHolidayThunk.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(createPublicHolidayThunk.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updatePublicHolidayThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(updatePublicHolidayThunk.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updatePublicHolidayThunk.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(deletePublicHolidayThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(deletePublicHolidayThunk.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(deletePublicHolidayThunk.rejected, (state) => {
        state.mutationLoading = false;
      });
  },
});

export default publicHolidaysSlice.reducer;
