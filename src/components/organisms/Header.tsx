import { useNavigate } from "react-router-dom";
import { Avatar } from "../atoms";
import { DropdownMenu } from "../molecules";
import { useAuth } from "../../hooks/useAuth";
import "./Header.css";

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <header className="header">
      <div />
      <DropdownMenu trigger={<Avatar name={user.name} />}>
        <div className="header__menu-header">
          <p className="header__menu-name">{user.name}</p>
          <p className="header__menu-role">{user.role}</p>
        </div>
        <button className="header__menu-item" onClick={() => navigate("/profile")}>
          Profile
        </button>
        <button className="header__menu-item" onClick={() => navigate("/change-password")}>
          Change password
        </button>
        <button className="header__menu-item header__menu-item--danger" onClick={handleSignOut}>
          Sign out
        </button>
      </DropdownMenu>
    </header>
  );
};
