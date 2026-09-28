import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../atoms";
import { FormField } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { forgotPasswordThunk } from "../../store/auth/authThunks";
import type { ForgotPasswordPayload } from "../../interface/auth";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
});

const initialValues: ForgotPasswordPayload = { email: "" };

export const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.auth.loading);

  const handleSubmit = async (values: ForgotPasswordPayload) => {
    const result = await dispatch(forgotPasswordThunk(values));
    if (forgotPasswordThunk.fulfilled.match(result)) {
      navigate(`/reset-password?email=${encodeURIComponent(values.email)}`);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <FormField name="email" label="Email" type="email" placeholder="you@company.com" />
        <Button type="submit" fullWidth isLoading={loading}>
          Send reset code
        </Button>
      </Form>
    </Formik>
  );
};
