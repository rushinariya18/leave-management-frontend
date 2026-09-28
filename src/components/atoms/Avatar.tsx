import "./Avatar.css";

interface AvatarProps {
  name: string;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("");
};

export const Avatar = ({ name }: AvatarProps) => {
  return <span className="avatar">{getInitials(name)}</span>;
};
