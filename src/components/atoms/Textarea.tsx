import type { TextareaHTMLAttributes } from "react";
import "./Textarea.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = ({ hasError = false, className = "", ...rest }: TextareaProps) => {
  return (
    <textarea
      className={`textarea ${hasError ? "textarea--error" : ""} ${className}`}
      {...rest}
    />
  );
};
