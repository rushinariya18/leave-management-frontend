import type { UserDetailData } from "../../interface/user";
import { Avatar, Badge } from "../atoms";
import { AssignManagerControl } from "./AssignManagerControl";
import { UserStatusAction } from "./UserStatusAction";
import "./UserDetail.css";

interface UserDetailProps {
  user: UserDetailData;
}

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : "—";

export const UserDetail = ({ user }: UserDetailProps) => {
  return (
    <div className="user-detail">
      <div className="user-detail__header">
        <Avatar name={user.name} />
        <div>
          <h1 className="user-detail__name">{user.name}</h1>
          <div className="user-detail__badges">
            <Badge variant="info">{user.role}</Badge>
            <Badge variant={user.isActive ? "success" : "danger"}>
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="user-detail__fields">
        <div>
          <span className="user-detail__field-label">Email</span>
          <span>{user.email}</span>
        </div>
        <div>
          <span className="user-detail__field-label">Joined</span>
          <span>{formatDate(user.joinDate)}</span>
        </div>
        <div>
          <span className="user-detail__field-label">Created</span>
          <span>{formatDate(user.createdAt)}</span>
        </div>
        <div>
          <span className="user-detail__field-label">Last updated</span>
          <span>{formatDate(user.updatedAt)}</span>
        </div>
      </div>

      <div className="user-detail__section">
        <h2>Manager</h2>
        <AssignManagerControl
          key={user.managerId ?? "unassigned"}
          userId={user.id}
          currentManagerId={user.managerId}
        />
      </div>

      <div className="user-detail__section">
        <h2>Account status</h2>
        <div className="user-detail__actions">
          <UserStatusAction user={user} />
        </div>
      </div>

      <div className="user-detail__section">
        <h2>Leave requests ({new Date().getFullYear()})</h2>
        {user.currentYearLeaveRequests.length === 0 ? (
          <p className="user-detail__empty">No leave requests this year.</p>
        ) : (
          <ul className="user-detail__leave-list">
            {user.currentYearLeaveRequests.map((request) => (
              <li key={request.id} className="user-detail__leave-item">
                <span>{request.leaveType.name}</span>
                <span>
                  {formatDate(request.startDate)} – {formatDate(request.endDate)}
                </span>
                <Badge variant="neutral">{request.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
