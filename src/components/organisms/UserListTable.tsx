import { useEffect } from "react";
import { Spinner } from "../atoms";
import { Pagination } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useUserFilters } from "../../hooks/useUserFilters";
import { fetchUsersThunk } from "../../store/userManagement/userManagementThunks";
import { UserFilters } from "./UserFilters";
import { UserTableRow } from "./UserTableRow";
import "./UserListTable.css";

const SORTABLE_COLUMNS: {
  key: "name" | "email" | "role" | "manager" | "createdAt";
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
];

export const UserListTable = () => {
  const dispatch = useAppDispatch();
  const { users, usersPagination, usersLoading } = useAppSelector((state) => state.userManagement);
  const {
    filters,
    setSearch,
    setRole,
    setIsActive,
    setManagerId,
    setSort,
    setPage,
    clearFilters,
    isFiltered,
    queryParams,
  } = useUserFilters();

  useEffect(() => {
    dispatch(fetchUsersThunk(queryParams));
  }, [dispatch, queryParams]);

  const refetch = () => dispatch(fetchUsersThunk(queryParams));

  return (
    <div>
      <UserFilters
        search={filters.search}
        role={filters.role}
        isActive={filters.isActive}
        managerId={filters.managerId}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onIsActiveChange={setIsActive}
        onManagerIdChange={setManagerId}
        onClear={clearFilters}
        isFiltered={isFiltered}
      />

      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              {SORTABLE_COLUMNS.map((column) => (
                <th key={column.key}>
                  <button type="button" onClick={() => setSort(column.key)}>
                    {column.label}
                    {filters.sortBy === column.key ? (filters.sortOrder === "asc" ? " ▲" : " ▼") : ""}
                  </button>
                </th>
              ))}
              <th>Status</th>
              <th>
                <button type="button" onClick={() => setSort("createdAt")}>
                  Joined
                  {filters.sortBy === "createdAt" ? (filters.sortOrder === "asc" ? " ▲" : " ▼") : ""}
                </button>
              </th>
              <th>
                <button type="button" onClick={() => setSort("manager")}>
                  Manager
                  {filters.sortBy === "manager" ? (filters.sortOrder === "asc" ? " ▲" : " ▼") : ""}
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersLoading && users.length === 0 ? (
              <tr>
                <td colSpan={7} className="user-table__empty">
                  <Spinner />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="user-table__empty">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserTableRow key={user.id} user={user} onStatusChanged={refetch} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {usersPagination && (
        <Pagination
          page={usersPagination.page}
          totalPages={usersPagination.totalPages}
          onPageChange={setPage}
          isLoading={usersLoading}
        />
      )}
    </div>
  );
};
