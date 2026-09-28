import { useField } from "formik";
import type { InputHTMLAttributes } from "react";
import { ErrorText, Input, Label } from "../atoms";
import "./FormField.css";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const FormField = ({ name, label, ...rest }: FormFieldProps) => {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);

  return (
    <div className="form-field">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} hasError={hasError} {...field} {...rest} />
      <ErrorText>{hasError ? meta.error : undefined}</ErrorText>
    </div>
  );
};
