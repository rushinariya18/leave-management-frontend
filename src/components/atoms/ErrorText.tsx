import "./ErrorText.css";

interface ErrorTextProps {
  children?: string;
}

export const ErrorText = ({ children }: ErrorTextProps) => {
  if (!children) return null;
  return <span className="error-text">{children}</span>;
};
