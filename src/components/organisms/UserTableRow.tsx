import { Link } from "react-router-dom";
import type { UserListItem } from "../../interface/user";
import { Avatar, Badge } from "../atoms";
import { UserStatusAction } from "./UserStatusAction";

interface UserTableRowProps {
  user: UserListItem;
  onStatusChanged: () => void;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export const UserTableRow = ({ user, onStatusChanged }: UserTableRowProps) => {
  return (
    <tr>
      <td>
        <div className="user-table-row__name">
          <Avatar name={user.name} />
          <span>{user.name}</span>
        </div>
      </td>
      <td>{user.email}</td>
      <td>
        <Badge variant="info">{user.role}</Badge>
      </td>
      <td>
        <Badge variant={user.isActive ? "success" : "danger"}>
          {user.isActive ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td>{formatDate(user.createdAt)}</td>
      <td>{user.manager?.name ?? "—"}</td>
      <td>
        <div className="user-table-row__actions">
          <Link to={`/users/${user.id}`}>View</Link>
          <UserStatusAction user={user} onChanged={onStatusChanged} />
        </div>
      </td>
    </tr>
  );
};
