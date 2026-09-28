import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../interface/auth";
import type { ManagerOption, PaginationMeta, UserDetailData, UserListItem } from "../../interface/user";
import {
  assignManagerThunk,
  createUserThunk,
  fetchManagerOptionsThunk,
  fetchUserByIdThunk,
  fetchUsersThunk,
  updateUserStatusThunk,
} from "./userManagementThunks";

interface UserManagementState {
  users: UserListItem[];
  usersPagination: PaginationMeta | null;
  usersLoading: boolean;
  selectedUser: UserDetailData | null;
  selectedUserLoading: boolean;
  managerOptions: ManagerOption[];
  managerOptionsLoading: boolean;
  mutationLoading: boolean;
}

const initialState: UserManagementState = {
  users: [],
  usersPagination: null,
  usersLoading: false,
  selectedUser: null,
  selectedUserLoading: false,
  managerOptions: [],
  managerOptionsLoading: false,
  mutationLoading: false,
};

const mergeIntoSelectedUser = (
  selectedUser: UserDetailData | null,
  updated: User,
): UserDetailData | null => {
  if (!selectedUser || selectedUser.id !== updated.id) return selectedUser;
  return { ...selectedUser, ...updated };
};

const patchUserRow = (users: UserListItem[], updated: User) => {
  const idx = users.findIndex((u) => u.id === updated.id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], isActive: updated.isActive ?? users[idx].isActive, role: updated.role };
  }
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.usersLoading = true;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload.items;
        state.usersPagination = action.payload.pagination;
      })
      .addCase(fetchUsersThunk.rejected, (state) => {
        state.usersLoading = false;
      })
      .addCase(fetchUserByIdThunk.pending, (state) => {
        state.selectedUserLoading = true;
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserByIdThunk.rejected, (state) => {
        state.selectedUserLoading = false;
      })
      .addCase(createUserThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(createUserThunk.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(createUserThunk.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(updateUserStatusThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(updateUserStatusThunk.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.selectedUser = mergeIntoSelectedUser(state.selectedUser, action.payload);
        patchUserRow(state.users, action.payload);
      })
      .addCase(updateUserStatusThunk.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(assignManagerThunk.pending, (state) => {
        state.mutationLoading = true;
      })
      .addCase(assignManagerThunk.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.selectedUser = mergeIntoSelectedUser(state.selectedUser, action.payload);
      })
      .addCase(assignManagerThunk.rejected, (state) => {
        state.mutationLoading = false;
      })
      .addCase(fetchManagerOptionsThunk.pending, (state) => {
        state.managerOptionsLoading = true;
      })
      .addCase(fetchManagerOptionsThunk.fulfilled, (state, action) => {
        state.managerOptionsLoading = false;
        state.managerOptions = action.payload.items;
      })
      .addCase(fetchManagerOptionsThunk.rejected, (state) => {
        state.managerOptionsLoading = false;
      });
  },
});

export const { clearSelectedUser } = userManagementSlice.actions;
export default userManagementSlice.reducer;
