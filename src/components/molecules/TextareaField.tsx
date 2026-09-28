import { useField } from "formik";
import type { TextareaHTMLAttributes } from "react";
import { ErrorText, Label, Textarea } from "../atoms";
import "./FormField.css";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

export const TextareaField = ({ name, label, ...rest }: TextareaFieldProps) => {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);

  return (
    <div className="form-field">
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} hasError={hasError} {...field} {...rest} />
      <ErrorText>{hasError ? meta.error : undefined}</ErrorText>
    </div>
  );
};
