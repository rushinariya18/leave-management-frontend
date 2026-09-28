import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type {
  CreateLeaveTypePayload,
  LeaveType,
  UpdateLeaveTypePayload,
} from "../../interface/leaveType";
import { leaveTypeService } from "../../services/leaveTypeService";

export const fetchLeaveTypesThunk = createAsyncThunk<LeaveType[], void>(
  "leaveTypes/fetchLeaveTypes",
  async () => {
    const response = await leaveTypeService.list();
    return response.data;
  },
);

export const fetchLeaveTypeByIdThunk = createAsyncThunk<LeaveType, string>(
  "leaveTypes/fetchLeaveTypeById",
  async (id) => {
    const response = await leaveTypeService.getById(id);
    return response.data;
  },
);

export const createLeaveTypeThunk = createAsyncThunk<LeaveType, CreateLeaveTypePayload>(
  "leaveTypes/createLeaveType",
  async (payload) => {
    const response = await leaveTypeService.create(payload);
    toast.success(response.message);
    return response.data;
  },
);

export const updateLeaveTypeThunk = createAsyncThunk<
  LeaveType,
  { id: string; payload: UpdateLeaveTypePayload }
>("leaveTypes/updateLeaveType", async ({ id, payload }) => {
  const response = await leaveTypeService.update(id, payload);
  toast.success(response.message);
  return response.data;
});

export const deleteLeaveTypeThunk = createAsyncThunk<string, string>(
  "leaveTypes/deleteLeaveType",
  async (id) => {
    const response = await leaveTypeService.remove(id);
    toast.success(response.message);
    return id;
  },
);
