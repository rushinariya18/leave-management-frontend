export type LeavePeriodType = "NONE" | "HALF_YEAR";

export interface LeaveType {
  id: string;
  name: string;
  description: string | null;
  deductsBalance: boolean;
  defaultAllowance: number;
  requiresApproval: boolean;
  minAdvanceNoticeDays: number;
  maxDaysPerRequest: number;
  allowsPastDates: boolean;
  periodType: LeavePeriodType;
  maxRequestsPerPeriod: number | null;
  allowsCarryForward: boolean;
  maxCarryForwardDays: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeaveTypePayload {
  name: string;
  description?: string;
  deductsBalance?: boolean;
  defaultAllowance: number;
  requiresApproval?: boolean;
  minAdvanceNoticeDays?: number;
  maxDaysPerRequest: number;
  allowsPastDates?: boolean;
  periodType?: LeavePeriodType;
  maxRequestsPerPeriod?: number;
  allowsCarryForward?: boolean;
  maxCarryForwardDays?: number;
}

export type UpdateLeaveTypePayload = Partial<CreateLeaveTypePayload> & {
  isActive?: boolean;
};
