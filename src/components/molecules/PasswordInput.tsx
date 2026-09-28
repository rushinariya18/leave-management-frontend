import { useField } from "formik";
import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { ErrorText, Input, Label } from "../atoms";
import "./PasswordInput.css";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const PasswordInput = ({ name, label, ...rest }: PasswordInputProps) => {
  const [field, meta] = useField(name);
  const [visible, setVisible] = useState(false);
  const hasError = Boolean(meta.touched && meta.error);

  return (
    <div className="password-field">
      <Label htmlFor={name}>{label}</Label>
      <div className="password-field__wrapper">
        <Input
          id={name}
          type={visible ? "text" : "password"}
          hasError={hasError}
          {...field}
          {...rest}
        />
        <button
          type="button"
          className="password-field__toggle"
          onClick={() => setVisible((prev) => !prev)}
          tabIndex={-1}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      <ErrorText>{hasError ? meta.error : undefined}</ErrorText>
    </div>
  );
};
