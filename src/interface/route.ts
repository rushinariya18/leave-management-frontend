import type { ReactNode } from "react";
import type { Role } from "./auth";

export interface AppRoute {
  path: string;
  element: ReactNode;
  isPrivate?: boolean;
  allowedRoles?: Role[];
}

export interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  allowedRoles?: Role[];
}

export const getDefaultRouteForRole = (role: Role): string => {
  if (role === "HR") return "/calendar";
  return "/leave-balances";
};
