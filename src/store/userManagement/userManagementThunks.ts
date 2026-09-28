import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type { User } from "../../interface/auth";
import type {
  AssignManagerPayload,
  CreateUserPayload,
  ManagersListParams,
  ManagersListResponseData,
  UpdateUserStatusPayload,
  UserDetailData,
  UsersListParams,
  UsersListResponseData,
} from "../../interface/user";
import { userManagementService } from "../../services/userManagementService";

export const fetchUsersThunk = createAsyncThunk<UsersListResponseData, UsersListParams>(
  "userManagement/fetchUsers",
  async (params) => {
    const response = await userManagementService.list(params);
    return response.data;
  },
);

export const createUserThunk = createAsyncThunk<User, CreateUserPayload>(
  "userManagement/createUser",
  async (payload) => {
    const response = await userManagementService.create(payload);
    toast.success(response.message);
    return response.data;
  },
);

export const fetchUserByIdThunk = createAsyncThunk<UserDetailData, string>(
  "userManagement/fetchUserById",
  async (id) => {
    const response = await userManagementService.getById(id);
    return response.data;
  },
);

export const updateUserStatusThunk = createAsyncThunk<
  User,
  { id: string; payload: UpdateUserStatusPayload }
>("userManagement/updateUserStatus", async ({ id, payload }) => {
  const response = await userManagementService.updateStatus(id, payload);
  toast.success(response.message);
  return response.data;
});

export const assignManagerThunk = createAsyncThunk<
  User,
  { id: string; payload: AssignManagerPayload }
>("userManagement/assignManager", async ({ id, payload }) => {
  const response = await userManagementService.assignManager(id, payload);
  toast.success(response.message);
  return response.data;
});

export const fetchManagerOptionsThunk = createAsyncThunk<
  ManagersListResponseData,
  ManagersListParams
>("userManagement/fetchManagerOptions", async (params) => {
  const response = await userManagementService.listManagers(params);
  return response.data;
});
