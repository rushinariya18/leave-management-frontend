import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { HrCalendarFilters, LeaveCalendar } from "../../components/organisms";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuth } from "../../hooks/useAuth";
import { fetchHrCalendarThunk, fetchTeamCalendarThunk } from "../../store/calendar/calendarThunks";
import "./CalendarPage.css";

export const CalendarPage = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { entries, entriesLoading } = useAppSelector((state) => state.calendar);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [employeeId, setEmployeeId] = useState("");
  const [viewAsTeam, setViewAsTeam] = useState(false);

  const isHr = user?.role === "HR";
  const month = dayjs(currentMonth).format("YYYY-MM");
  const isFiltered = employeeId !== "" || viewAsTeam;

  useEffect(() => {
    if (isHr) {
      dispatch(
        fetchHrCalendarThunk({
          month,
          employeeId: employeeId || undefined,
          role: viewAsTeam ? "MANAGER" : undefined,
        }),
      );
    } else {
      dispatch(fetchTeamCalendarThunk({ month }));
    }
  }, [dispatch, isHr, month, employeeId, viewAsTeam]);

  const handleClear = () => {
    setEmployeeId("");
    setViewAsTeam(false);
  };

  return (
    <div>
      <div className="calendar-page__header">
        <h1>Calendar</h1>
      </div>

      {isHr && (
        <HrCalendarFilters
          employeeId={employeeId}
          viewAsTeam={viewAsTeam}
          onEmployeeIdChange={setEmployeeId}
          onViewAsTeamChange={setViewAsTeam}
          onClear={handleClear}
          isFiltered={isFiltered}
        />
      )}

      <LeaveCalendar
        entries={entries}
        loading={entriesLoading}
        currentMonth={currentMonth}
        onNavigate={setCurrentMonth}
      />
    </div>
  );
};
