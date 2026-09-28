import { useMemo, useState } from "react";
import type { Role } from "../interface/auth";
import type { UsersListParams } from "../interface/user";

type SortBy = "name" | "email" | "role" | "manager" | "createdAt";
type SortOrder = "asc" | "desc";

const DEFAULT_LIMIT = 10;

export const useUserFilters = () => {
  const [search, setSearchState] = useState("");
  const [role, setRoleState] = useState<Role | "">("");
  const [isActive, setIsActiveState] = useState<"" | "true" | "false">("");
  const [managerId, setManagerIdState] = useState("");
  const [sortBy, setSortBy] = useState<SortBy | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit] = useState(DEFAULT_LIMIT);

  const setSearch = (value: string) => {
    setSearchState(value);
    setPage(1);
  };

  const setRole = (value: Role | "") => {
    setRoleState(value);
    setPage(1);
  };

  const setIsActive = (value: "" | "true" | "false") => {
    setIsActiveState(value);
    setPage(1);
  };

  const setManagerId = (value: string) => {
    setManagerIdState(value);
    setPage(1);
  };

  const setSort = (field: SortBy) => {
    setPage(1);
    setSortBy((prevField) => {
      if (prevField !== field) {
        setSortOrder("asc");
        return field;
      }
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      return field;
    });
  };

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  const clearFilters = () => {
    setSearchState("");
    setRoleState("");
    setIsActiveState("");
    setManagerIdState("");
    setSortBy(undefined);
    setSortOrder(undefined);
    setPage(1);
  };

  const isFiltered =
    search !== "" ||
    role !== "" ||
    isActive !== "" ||
    managerId !== "" ||
    sortBy !== undefined ||
    sortOrder !== undefined;

  const queryParams: UsersListParams = useMemo(
    () => ({
      search: search || undefined,
      role: role || undefined,
      isActive: isActive || undefined,
      managerId: managerId || undefined,
      sortBy,
      sortOrder,
      page: String(page),
      limit: String(limit),
    }),
    [search, role, isActive, managerId, sortBy, sortOrder, page, limit],
  );

  return {
    filters: { search, role, isActive, managerId, sortBy, sortOrder, page, limit },
    setSearch,
    setRole,
    setIsActive,
    setManagerId,
    setSort,
    setPage,
    nextPage,
    prevPage,
    clearFilters,
    isFiltered,
    queryParams,
  };
};
