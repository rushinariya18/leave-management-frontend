import { Link } from "react-router-dom";
import { AuthLayout, ResetPasswordForm } from "../../components/organisms";

export const ResetPasswordPage = () => {
  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter the code we sent you along with your new password."
      footer={<Link to="/login">Back to sign in</Link>}
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};
