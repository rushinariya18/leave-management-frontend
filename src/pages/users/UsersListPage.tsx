import { Link } from "react-router-dom";
import { Button } from "../../components/atoms";
import { UserListTable } from "../../components/organisms";
import "./UsersListPage.css";

export const UsersListPage = () => {
  return (
    <div>
      <div className="users-list-page__header">
        <h1>Users</h1>
        <Link to="/users/new">
          <Button type="button">Add user</Button>
        </Link>
      </div>
      <UserListTable />
    </div>
  );
};
