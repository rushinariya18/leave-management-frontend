import type { ReactNode } from "react";
import "./Badge.css";

interface BadgeProps {
  children: ReactNode;
  variant?: "neutral" | "success" | "danger" | "info";
}

export const Badge = ({ children, variant = "neutral" }: BadgeProps) => {
  return <span className={`badge badge--${variant}`}>{children}</span>;
};
