import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../interface/auth";
import { fetchCurrentUserThunk, updateProfileThunk } from "./usersThunks";

interface UsersState {
  currentUser: User | null;
  loading: boolean;
}

const initialState: UsersState = {
  currentUser: null,
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUserThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export default usersSlice.reducer;
