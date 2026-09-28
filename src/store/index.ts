import { configureStore } from "@reduxjs/toolkit";
import { registerAuthAccessors } from "../services/axiosInstance";
import authReducer, { logout } from "./auth/authSlice";
import leaveBalancesReducer from "./leaveBalances/leaveBalancesSlice";
import leaveRequestsReducer from "./leaveRequests/leaveRequestsSlice";
import leaveTypesReducer from "./leaveTypes/leaveTypesSlice";
import publicHolidaysReducer from "./publicHolidays/publicHolidaysSlice";
import userManagementReducer from "./userManagement/userManagementSlice";
import usersReducer from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    userManagement: userManagementReducer,
    leaveTypes: leaveTypesReducer,
    publicHolidays: publicHolidaysReducer,
    leaveBalances: leaveBalancesReducer,
    leaveRequests: leaveRequestsReducer,
  },
});

registerAuthAccessors({
  getToken: () => store.getState().auth.token,
  onUnauthorized: () => store.dispatch(logout()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
