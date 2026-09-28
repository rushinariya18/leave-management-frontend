import { Form, Formik, useField } from "formik";
import type { FormikHelpers } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import type { SelectOption } from "../atoms";
import { Button, ErrorText, Label, Select } from "../atoms";
import { FormField, Modal, TextareaField } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { CreateLeaveRequestPayload, DayPart } from "../../interface/leaveRequest";
import { fetchLeaveTypesThunk } from "../../store/leaveTypes/leaveTypesThunks";
import { fetchMyLeaveBalancesThunk } from "../../store/leaveBalances/leaveBalancesThunks";
import {
  createLeaveRequestThunk,
  fetchMyLeaveRequestsThunk,
} from "../../store/leaveRequests/leaveRequestsThunks";
import "./RequestLeaveModal.css";

const DAY_PART_OPTIONS: SelectOption[] = [
  { value: "FULL_DAY", label: "Full day" },
  { value: "FIRST_HALF", label: "First half" },
  { value: "SECOND_HALF", label: "Second half" },
];

interface RequestLeaveFormValues {
  startDate: string;
  endDate: string;
  leaveTypeId: string;
  dayPart: DayPart;
  note: string;
}

const initialValues: RequestLeaveFormValues = {
  startDate: "",
  endDate: "",
  leaveTypeId: "",
  dayPart: "FIRST_HALF",
  note: "",
};

const validationSchema = Yup.object({
  leaveTypeId: Yup.string().required("Leave type is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string()
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be on or after start date",
      function isAfterStart(endDate) {
        const { startDate } = this.parent as { startDate: string };
        if (!startDate || !endDate) return true;
        return new Date(endDate) >= new Date(startDate);
      },
    ),
  dayPart: Yup.mixed<DayPart>().oneOf(["FULL_DAY", "FIRST_HALF", "SECOND_HALF"]).required(),
  note: Yup.string().max(500, "Note must be 500 characters or fewer"),
});

interface DayPartFieldProps {
  name: string;
}

const DayPartField = ({ name }: DayPartFieldProps) => {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);
  return (
    <div className="form-field">
      <Label htmlFor={name}>Day part</Label>
      <Select id={name} hasError={hasError} options={DAY_PART_OPTIONS} {...field} />
      <ErrorText>{hasError ? (meta.error as string) : undefined}</ErrorText>
    </div>
  );
};

interface LeaveTypeFieldProps {
  name: string;
  options: SelectOption[];
}

const LeaveTypeField = ({ name, options }: LeaveTypeFieldProps) => {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);
  return (
    <div className="form-field">
      <Label htmlFor={name}>Select type of leave you want to apply</Label>
      <Select
        id={name}
        hasError={hasError}
        options={options}
        placeholder="Select"
        {...field}
      />
      <ErrorText>{hasError ? (meta.error as string) : undefined}</ErrorText>
    </div>
  );
};

interface RequestLeaveModalProps {
  open: boolean;
  onClose: () => void;
}

export const RequestLeaveModal = ({ open, onClose }: RequestLeaveModalProps) => {
  const dispatch = useAppDispatch();
  const leaveTypes = useAppSelector((state) => state.leaveTypes.items);
  const leaveTypesLoading = useAppSelector((state) => state.leaveTypes.itemsLoading);
  const mutationLoading = useAppSelector((state) => state.leaveRequests.mutationLoading);

  useEffect(() => {
    if (open && leaveTypes.length === 0 && !leaveTypesLoading) {
      dispatch(fetchLeaveTypesThunk());
    }
  }, [open, leaveTypes.length, leaveTypesLoading, dispatch]);

  const leaveTypeOptions: SelectOption[] = leaveTypes.map((leaveType) => ({
    value: leaveType.id,
    label: leaveType.name,
  }));

  const handleSubmit = async (
    values: RequestLeaveFormValues,
    { resetForm }: FormikHelpers<RequestLeaveFormValues>,
  ) => {
    const isSingleDay = values.startDate === values.endDate;
    const payload: CreateLeaveRequestPayload = {
      leaveTypeId: values.leaveTypeId,
      startDate: values.startDate,
      endDate: values.endDate,
      dayPart: isSingleDay ? values.dayPart : "FULL_DAY",
      note: values.note.trim() ? values.note.trim() : undefined,
    };

    const result = await dispatch(createLeaveRequestThunk(payload));
    if (createLeaveRequestThunk.fulfilled.match(result)) {
      dispatch(fetchMyLeaveRequestsThunk());
      dispatch(fetchMyLeaveBalancesThunk());
      resetForm();
      onClose();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, resetForm }) => {
        const isSingleDay = Boolean(values.startDate) && values.startDate === values.endDate;

        const handleClose = () => {
          resetForm();
          onClose();
        };

        return (
          <Modal
            open={open}
            onClose={handleClose}
            title="Request Leave"
            footer={
              <>
                <Button type="button" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" form="request-leave-form" isLoading={mutationLoading}>
                  Submit
                </Button>
              </>
            }
          >
            <Form id="request-leave-form" className="request-leave-form">
              <div className="request-leave-form__date-row">
                <FormField name="startDate" label="From" type="date" />
                <FormField name="endDate" label="To" type="date" />
              </div>

              <LeaveTypeField name="leaveTypeId" options={leaveTypeOptions} />

              {isSingleDay && <DayPartField name="dayPart" />}

              <TextareaField name="note" label="Note" placeholder="Type here" />
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};
