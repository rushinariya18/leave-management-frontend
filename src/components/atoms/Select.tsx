import type { SelectHTMLAttributes } from "react";
import "./Select.css";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = ({
  hasError = false,
  options,
  placeholder,
  className = "",
  value,
  ...rest
}: SelectProps) => {
  return (
    <select
      className={`select ${hasError ? "select--error" : ""} ${className}`}
      value={value}
      {...rest}
    >
      {placeholder && (
        <option value="" disabled={value !== undefined && value !== ""}>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
