export type DayPart = "FULL_DAY" | "FIRST_HALF" | "SECOND_HALF";
export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
export type DecisionAction = "SUBMITTED" | "APPROVED" | "REJECTED" | "CANCELLED" | "AMENDED";

export interface MyLeaveRequest {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  days: number;
  dayPart: DayPart;
  status: RequestStatus;
  note: string | null;
  rejectionReason: string | null;
  decidedAt: string | null;
  decidedById: string | null;
  createdAt: string;
  updatedAt: string;
  leaveType: { id: string; name: string };
  decidedBy: { id: string; name: string } | null;
}

export interface AuditLogEntry {
  id: string;
  requestId: string;
  actorId: string;
  action: DecisionAction;
  reason: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  actor: { id: string; name: string; role: "EMPLOYEE" | "MANAGER" | "HR" };
}

export interface CreateLeaveRequestPayload {
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  dayPart?: DayPart;
  note?: string;
}

// Mirrors MyLeaveRequest; adds embedded employee info for the manager's team view.
// Falls back to employeeId in the UI if `employee` is absent from the live response.
export interface TeamPendingRequest extends MyLeaveRequest {
  employee?: { id: string; name: string };
}

export interface LeaveRequestDetail extends MyLeaveRequest {
  employee: { id: string; name: string; managerId?: string };
  overlappingTeamRequests: TeamPendingRequest[];
}
