import { NavLink } from "react-router-dom";
import { navConfig } from "../../routes/navConfig";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./Sidebar.css";

export const Sidebar = () => {
  const role = useAppSelector((state) => state.auth.user?.role);

  const visibleItems = navConfig.filter(
    (item) => !item.allowedRoles || (role && item.allowedRoles.includes(role)),
  );

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">Leave Portal</div>
      <nav className="sidebar__nav">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
          >
            <span className="sidebar__icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
