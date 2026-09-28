import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Event as RbcEvent } from "react-big-calendar";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { Spinner } from "../atoms";
import { Modal } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { CalendarEntry } from "../../interface/calendar";
import { fetchLeaveTypesThunk } from "../../store/leaveTypes/leaveTypesThunks";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./LeaveCalendar.css";

const localizer = dayjsLocalizer(dayjs);

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const dayPartLabel = (entry: CalendarEntry) => {
  if (entry.dayPart === "FIRST_HALF") return "First half";
  if (entry.dayPart === "SECOND_HALF") return "Second half";
  return "Full day";
};

interface CalendarEvent extends RbcEvent {
  resource: CalendarEntry;
}

const buildTitle = (entry: CalendarEntry) => {
  const suffix =
    entry.dayPart === "FIRST_HALF"
      ? " (First half)"
      : entry.dayPart === "SECOND_HALF"
        ? " (Second half)"
        : "";
  return `${entry.employee.name} – ${entry.leaveType.name}${suffix}`;
};

interface LeaveCalendarProps {
  entries: CalendarEntry[];
  loading: boolean;
  currentMonth: Date;
  onNavigate: (date: Date) => void;
}

export const LeaveCalendar = ({
  entries,
  loading,
  currentMonth,
  onNavigate,
}: LeaveCalendarProps) => {
  const dispatch = useAppDispatch();
  const leaveTypes = useAppSelector((state) => state.leaveTypes.items);
  const leaveTypesLoading = useAppSelector((state) => state.leaveTypes.itemsLoading);
  const hasRequestedLeaveTypes = useRef(false);
  const [selectedEntry, setSelectedEntry] = useState<CalendarEntry | null>(null);

  useEffect(() => {
    if (leaveTypes.length === 0 && !leaveTypesLoading && !hasRequestedLeaveTypes.current) {
      hasRequestedLeaveTypes.current = true;
      dispatch(fetchLeaveTypesThunk());
    }
  }, [leaveTypes.length, leaveTypesLoading, dispatch]);

  const colorForLeaveType = useMemo(() => {
    const map = new Map<string, string>();
    leaveTypes.forEach((leaveType, index) => {
      map.set(leaveType.id, CHART_COLORS[index % CHART_COLORS.length]);
    });
    return map;
  }, [leaveTypes]);

  const events: CalendarEvent[] = useMemo(
    () =>
      entries
        .filter((entry) => entry.status === "APPROVED")
        .map((entry) => ({
          title: buildTitle(entry),
          start: dayjs(entry.startDate).startOf("day").toDate(),
          // react-big-calendar treats an all-day event's `end` as exclusive,
          // so a same-day request needs `end` one day past `endDate` to render.
          end: dayjs(entry.endDate).startOf("day").add(1, "day").toDate(),
          allDay: true,
          resource: entry,
        })),
    [entries],
  );

  if (loading && entries.length === 0) {
    return (
      <div className="leave-calendar__empty">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="leave-calendar">
      <Calendar<CalendarEvent>
        localizer={localizer}
        events={events}
        views={["month"]}
        defaultView="month"
        date={currentMonth}
        onNavigate={onNavigate}
        onSelectEvent={(event) => setSelectedEntry(event.resource)}
        popup
        style={{ height: 700 }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor:
              colorForLeaveType.get(event.resource.leaveType.id) ?? "var(--color-primary)",
          },
        })}
      />

      <Modal
        open={selectedEntry !== null}
        onClose={() => setSelectedEntry(null)}
        title="Leave Details"
      >
        {selectedEntry && (
          <div className="leave-calendar-detail">
            <div className="leave-calendar-detail__row">
              <span className="leave-calendar-detail__label">Employee</span>
              <span>{selectedEntry.employee.name}</span>
            </div>
            <div className="leave-calendar-detail__row">
              <span className="leave-calendar-detail__label">Leave Type</span>
              <span>{selectedEntry.leaveType.name}</span>
            </div>
            <div className="leave-calendar-detail__row">
              <span className="leave-calendar-detail__label">Dates</span>
              <span>
                {formatDate(selectedEntry.startDate)} – {formatDate(selectedEntry.endDate)}
              </span>
            </div>
            <div className="leave-calendar-detail__row">
              <span className="leave-calendar-detail__label">Day Part</span>
              <span>{dayPartLabel(selectedEntry)}</span>
            </div>
            <div className="leave-calendar-detail__row leave-calendar-detail__row--note">
              <span className="leave-calendar-detail__label">Reason</span>
              <span>{selectedEntry.note ?? "No reason provided."}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
