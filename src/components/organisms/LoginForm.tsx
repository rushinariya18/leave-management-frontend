import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../atoms";
import { FormField, PasswordInput } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { signinThunk } from "../../store/auth/authThunks";
import type { SigninPayload } from "../../interface/auth";
import { getDefaultRouteForRole } from "../../interface/route";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues: SigninPayload = { email: "", password: "" };

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.auth.loading);

  const handleSubmit = async (values: SigninPayload) => {
    const result = await dispatch(signinThunk(values));
    if (signinThunk.fulfilled.match(result)) {
      navigate(getDefaultRouteForRole(result.payload.user.role), { replace: true });
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <FormField name="email" label="Email" type="email" placeholder="you@company.com" />
        <PasswordInput name="password" label="Password" placeholder="••••••••" />
        <Button type="submit" fullWidth isLoading={loading}>
          Sign in
        </Button>
      </Form>
    </Formik>
  );
};
