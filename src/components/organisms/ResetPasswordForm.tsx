import { Form, Formik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../atoms";
import { FormField, OtpInput, PasswordInput } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { resendOtpThunk, resetPasswordThunk } from "../../store/auth/authThunks";
import type { ResetPasswordPayload } from "../../interface/auth";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be 6 digits")
    .required("OTP is required"),
  newPassword: Yup.string().min(8, "Minimum 8 characters").required("New password is required"),
});

export const ResetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loading = useAppSelector((state) => state.auth.loading);

  const initialValues: ResetPasswordPayload = {
    email: searchParams.get("email") ?? "",
    otp: "",
    newPassword: "",
  };

  const handleSubmit = async (values: ResetPasswordPayload) => {
    const result = await dispatch(resetPasswordThunk(values));
    if (resetPasswordThunk.fulfilled.match(result)) {
      navigate("/login", { replace: true });
    }
  };

  const handleResend = async (email: string) => {
    if (!email) return;
    await dispatch(resendOtpThunk({ email }));
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form>
          <FormField name="email" label="Email" type="email" placeholder="you@company.com" />
          <OtpInput name="otp" label="OTP Code" />
          <PasswordInput name="newPassword" label="New Password" placeholder="••••••••" />
          <Button type="submit" fullWidth isLoading={loading}>
            Reset password
          </Button>
          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={() => handleResend(values.email)}
          >
            Resend code
          </Button>
        </Form>
      )}
    </Formik>
  );
};
