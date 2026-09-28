import type { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = ({ hasError = false, className = "", ...rest }: InputProps) => {
  return <input className={`input ${hasError ? "input--error" : ""} ${className}`} {...rest} />;
};
