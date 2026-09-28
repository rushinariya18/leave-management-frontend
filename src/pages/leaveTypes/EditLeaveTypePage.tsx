import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/atoms";
import { LeaveTypeForm } from "../../components/organisms";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { clearSelectedLeaveType } from "../../store/leaveTypes/leaveTypesSlice";
import { fetchLeaveTypeByIdThunk } from "../../store/leaveTypes/leaveTypesThunks";

export const EditLeaveTypePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selected, selectedLoading } = useAppSelector((state) => state.leaveTypes);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchLeaveTypeByIdThunk(id));
    return () => {
      dispatch(clearSelectedLeaveType());
    };
  }, [dispatch, id]);

  if (selectedLoading || !selected) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Edit Leave Type</h1>
      <LeaveTypeForm leaveType={selected} />
    </div>
  );
};
