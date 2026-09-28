import { createSlice } from "@reduxjs/toolkit";
import type { CalendarEntry } from "../../interface/calendar";
import { fetchHrCalendarThunk, fetchTeamCalendarThunk } from "./calendarThunks";

interface CalendarState {
  entries: CalendarEntry[];
  entriesLoading: boolean;
}

const initialState: CalendarState = {
  entries: [],
  entriesLoading: false,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamCalendarThunk.pending, (state) => {
        state.entriesLoading = true;
      })
      .addCase(fetchTeamCalendarThunk.fulfilled, (state, action) => {
        state.entriesLoading = false;
        state.entries = action.payload;
      })
      .addCase(fetchTeamCalendarThunk.rejected, (state) => {
        state.entriesLoading = false;
      })
      .addCase(fetchHrCalendarThunk.pending, (state) => {
        state.entriesLoading = true;
      })
      .addCase(fetchHrCalendarThunk.fulfilled, (state, action) => {
        state.entriesLoading = false;
        state.entries = action.payload;
      })
      .addCase(fetchHrCalendarThunk.rejected, (state) => {
        state.entriesLoading = false;
      });
  },
});

export default calendarSlice.reducer;
