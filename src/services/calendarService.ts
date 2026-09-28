import type { ApiResponse } from "../interface/api";
import type { CalendarEntry, HrCalendarParams, TeamCalendarParams } from "../interface/calendar";
import { axiosInstance } from "./axiosInstance";

export const calendarService = {
  getTeamCalendar: (params: TeamCalendarParams) =>
    axiosInstance.get<never, ApiResponse<CalendarEntry[]>>("/leave-requests/calendar", {
      params,
    }),

  getHrCalendar: (params: HrCalendarParams) =>
    axiosInstance.get<never, ApiResponse<CalendarEntry[]>>("/leave-requests/calendar/hr", {
      params,
    }),
};
