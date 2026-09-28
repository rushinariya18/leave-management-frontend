import { Link } from "react-router-dom";
import { AuthLayout, LoginForm } from "../../components/organisms";

export const LoginPage = () => {
  return (
    <AuthLayout
      title="Sign in"
      subtitle="Welcome back, please enter your details."
      footer={<Link to="/forgot-password">Forgot password?</Link>}
    >
      <LoginForm />
    </AuthLayout>
  );
};
