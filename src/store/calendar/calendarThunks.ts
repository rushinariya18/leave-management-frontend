import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CalendarEntry, HrCalendarParams, TeamCalendarParams } from "../../interface/calendar";
import { calendarService } from "../../services/calendarService";

export const fetchTeamCalendarThunk = createAsyncThunk<CalendarEntry[], TeamCalendarParams>(
  "calendar/fetchTeamCalendar",
  async (params) => {
    const response = await calendarService.getTeamCalendar(params);
    return response.data;
  },
);

export const fetchHrCalendarThunk = createAsyncThunk<CalendarEntry[], HrCalendarParams>(
  "calendar/fetchHrCalendar",
  async (params) => {
    const response = await calendarService.getHrCalendar(params);
    return response.data;
  },
);
