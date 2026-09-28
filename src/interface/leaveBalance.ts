export interface LeaveBalanceSummary {
  leaveTypeId: string;
  leaveTypeName: string;
  total: number;
  available: number;
  consumed: number;
}

export interface LeaveBalanceHistoryEntry {
  transactionDate: string;
  change: number;
  balance: number;
  reason: string;
  requestId: string | null;
}

export interface LeaveBalanceHistoryResponse {
  leaveTypeId: string;
  leaveTypeName: string;
  year: number;
  currentBalance: number;
  history: LeaveBalanceHistoryEntry[];
}
