import { Link } from "react-router-dom";
import { AuthLayout, ForgotPasswordForm } from "../../components/organisms";

export const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email and we'll send you a reset code."
      footer={<Link to="/login">Back to sign in</Link>}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};
