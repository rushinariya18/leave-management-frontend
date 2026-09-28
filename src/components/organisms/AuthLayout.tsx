import type { ReactNode } from "react";
import "./AuthLayout.css";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const AuthLayout = ({ title, subtitle, children, footer }: AuthLayoutProps) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__card">
        <h1 className="auth-layout__title">{title}</h1>
        {subtitle && <p className="auth-layout__subtitle">{subtitle}</p>}
        {children}
        {footer && <div className="auth-layout__footer">{footer}</div>}
      </div>
    </div>
  );
};
