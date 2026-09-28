import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../components/organisms";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";
import { ChangePasswordPage } from "../pages/dashboard/ChangePasswordPage";
import { ProfilePage } from "../pages/dashboard/ProfilePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AddUserPage } from "../pages/users/AddUserPage";
import { UserDetailPage } from "../pages/users/UserDetailPage";
import { UsersListPage } from "../pages/users/UsersListPage";
import { AddLeaveTypePage } from "../pages/leaveTypes/AddLeaveTypePage";
import { EditLeaveTypePage } from "../pages/leaveTypes/EditLeaveTypePage";
import { LeaveTypesListPage } from "../pages/leaveTypes/LeaveTypesListPage";
import { PublicHolidaysListPage } from "../pages/publicHolidays/PublicHolidaysListPage";
import { LeaveBalancesPage } from "../pages/leaveBalances/LeaveBalancesPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/leave-balances" replace />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPasswordPage />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/leave-balances" element={<LeaveBalancesPage />} />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <UsersListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/new"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <AddUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <UserDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave-types"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <LeaveTypesListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave-types/new"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <AddLeaveTypePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave-types/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <EditLeaveTypePage />
            </ProtectedRoute>
          }
        />

        <Route path="/public-holidays" element={<PublicHolidaysListPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
