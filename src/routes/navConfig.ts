import type { NavItem } from "../interface/route";

export const navConfig: NavItem[] = [
  {
    label: "Leave Balances",
    path: "/leave-balances",
    icon: "📊",
    allowedRoles: ["EMPLOYEE", "MANAGER"],
  },
  {
    label: "Calendar",
    path: "/calendar",
    icon: "🗓️",
  },
  {
    label: "My Team",
    path: "/my-team",
    icon: "🧑‍🤝‍🧑",
    allowedRoles: ["MANAGER"],
  },
  {
    label: "Users",
    path: "/users",
    icon: "👥",
    allowedRoles: ["HR"],
  },
  {
    label: "Leave Types",
    path: "/leave-types",
    icon: "📋",
    allowedRoles: ["HR"],
  },
  {
    label: "Public Holidays",
    path: "/public-holidays",
    icon: "📅",
  },
];
