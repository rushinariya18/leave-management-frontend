import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div style={{ padding: "48px", textAlign: "center" }}>
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/leave-balances">Go to leave balances</Link>
    </div>
  );
};
