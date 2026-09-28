import type { NavItem } from "../interface/route";

export const navConfig: NavItem[] = [
  {
    label: "Leave Balances",
    path: "/leave-balances",
    icon: "📊",
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
