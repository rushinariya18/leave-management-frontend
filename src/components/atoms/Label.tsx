import type { LabelHTMLAttributes, ReactNode } from "react";
import "./Label.css";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({ children, className = "", ...rest }: LabelProps) => {
  return (
    <label className={`label ${className}`} {...rest}>
      {children}
    </label>
  );
};
