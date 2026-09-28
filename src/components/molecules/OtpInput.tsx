import { useField } from "formik";
import { ErrorText, Input, Label } from "../atoms";
import "./OtpInput.css";

interface OtpInputProps {
  name: string;
  label: string;
}

export const OtpInput = ({ name, label }: OtpInputProps) => {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);

  return (
    <div className="otp-field">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={6}
        placeholder="6-digit code"
        hasError={hasError}
        {...field}
      />
      <ErrorText>{hasError ? meta.error : undefined}</ErrorText>
    </div>
  );
};
