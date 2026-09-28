import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/atoms";
import { UserDetail } from "../../components/organisms";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { clearSelectedUser } from "../../store/userManagement/userManagementSlice";
import { fetchUserByIdThunk } from "../../store/userManagement/userManagementThunks";

export const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedUser, selectedUserLoading } = useAppSelector((state) => state.userManagement);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchUserByIdThunk(id));
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, id]);

  if (selectedUserLoading || !selectedUser) {
    return <Spinner />;
  }

  return <UserDetail user={selectedUser} />;
};
