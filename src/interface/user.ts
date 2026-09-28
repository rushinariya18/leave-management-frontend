import type { Role, User } from "./auth";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ManagerRef {
  id: string;
  name: string;
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  manager: ManagerRef | null;
}

export interface UsersListParams {
  search?: string;
  role?: Role;
  isActive?: "true" | "false";
  managerId?: string;
  sortBy?: "name" | "email" | "role" | "manager" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: string;
  limit?: string;
}

export interface UsersListResponseData {
  items: UserListItem[];
  pagination: PaginationMeta;
}

export interface ManagerOption {
  id: string;
  name: string;
  email: string;
}

export interface ManagersListParams {
  search?: string;
  page?: string;
  limit?: string;
}

export interface ManagersListResponseData {
  items: ManagerOption[];
  pagination: PaginationMeta;
}

export interface LeaveRequestSummary {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  leaveType: { id: string; name: string };
  decidedBy: { id: string; name: string } | null;
}

export interface UserDetailData extends User {
  currentYearLeaveRequests: LeaveRequestSummary[];
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  managerId?: string;
}

export interface UpdateUserStatusPayload {
  isActive: boolean;
}

export interface AssignManagerPayload {
  managerId: string | null;
}
