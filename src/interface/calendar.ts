import type { DayPart, RequestStatus } from "./leaveRequest";

export interface CalendarEntry {
  id: string;
  startDate: string;
  endDate: string;
  dayPart: DayPart;
  status: RequestStatus;
  note: string | null;
  employee: { id: string; name: string; manager?: { id: string; name: string } };
  leaveType: { id: string; name: string };
}

export interface TeamCalendarParams {
  month: string;
}

export interface HrCalendarParams {
  month: string;
  employeeId?: string;
  role?: "MANAGER";
}
