import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`btn btn--${variant} ${fullWidth ? "btn--full" : ""} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
};
