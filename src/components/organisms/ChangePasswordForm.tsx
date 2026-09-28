import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../atoms";
import { PasswordInput } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../store/auth/authSlice";
import { changePasswordThunk } from "../../store/users/usersThunks";
import type { ChangePasswordPayload } from "../../interface/auth";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string().min(8, "Minimum 8 characters").required("New password is required"),
});

const initialValues: ChangePasswordPayload = { currentPassword: "", newPassword: "" };

export const ChangePasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: ChangePasswordPayload) => {
    const result = await dispatch(changePasswordThunk(values));
    if (changePasswordThunk.fulfilled.match(result)) {
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <PasswordInput name="currentPassword" label="Current Password" placeholder="••••••••" />
          <PasswordInput name="newPassword" label="New Password" placeholder="••••••••" />
          <Button type="submit" isLoading={isSubmitting}>
            Change password
          </Button>
        </Form>
      )}
    </Formik>
  );
};
