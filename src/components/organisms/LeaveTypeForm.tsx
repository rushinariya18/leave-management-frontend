import { Form, Formik, useField } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import type {
  CreateLeaveTypePayload,
  LeavePeriodType,
  LeaveType,
} from "../../interface/leaveType";
import { Button, ErrorText, Label, Select } from "../atoms";
import type { SelectOption } from "../atoms";
import { FormField } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { createLeaveTypeThunk, updateLeaveTypeThunk } from "../../store/leaveTypes/leaveTypesThunks";
import "./LeaveTypeForm.css";

const PERIOD_TYPE_OPTIONS: SelectOption[] = [
  { value: "NONE", label: "None" },
  { value: "HALF_YEAR", label: "Half year" },
];

const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, "Minimum 2 characters").required("Name is required"),
  description: Yup.string().optional(),
  deductsBalance: Yup.boolean().required(),
  defaultAllowance: Yup.number()
    .min(0, "Must be 0 or greater")
    .required("Default allowance is required"),
  requiresApproval: Yup.boolean().required(),
  minAdvanceNoticeDays: Yup.number().integer("Must be a whole number").min(0, "Must be 0 or greater"),
  maxDaysPerRequest: Yup.number()
    .moreThan(0, "Must be greater than 0")
    .required("Max days per request is required"),
  allowsPastDates: Yup.boolean().required(),
  periodType: Yup.mixed<LeavePeriodType>().oneOf(["NONE", "HALF_YEAR"]).required(),
  maxRequestsPerPeriod: Yup.number().integer("Must be a whole number").moreThan(0, "Must be greater than 0").optional(),
  allowsCarryForward: Yup.boolean().required(),
  maxCarryForwardDays: Yup.number().min(0, "Must be 0 or greater").optional(),
});

interface CheckboxFieldProps {
  name: string;
  label: string;
}

const CheckboxField = ({ name, label }: CheckboxFieldProps) => {
  const [field] = useField({ name, type: "checkbox" });
  return (
    <div className="leave-type-form__checkbox">
      <input id={name} type="checkbox" {...field} checked={field.value} />
      <Label htmlFor={name}>{label}</Label>
    </div>
  );
};

interface SelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
}

const SelectField = ({ name, label, options }: SelectFieldProps) => {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);
  return (
    <div className="form-field">
      <Label htmlFor={name}>{label}</Label>
      <Select id={name} hasError={hasError} options={options} {...field} />
      <ErrorText>{hasError ? meta.error : undefined}</ErrorText>
    </div>
  );
};

interface LeaveTypeFormProps {
  leaveType?: LeaveType;
}

type LeaveTypeFormValues = Omit<
  CreateLeaveTypePayload,
  "maxRequestsPerPeriod" | "maxCarryForwardDays"
> & {
  maxRequestsPerPeriod: number | "";
  maxCarryForwardDays: number | "";
};

const buildInitialValues = (leaveType?: LeaveType): LeaveTypeFormValues => ({
  name: leaveType?.name ?? "",
  description: leaveType?.description ?? "",
  deductsBalance: leaveType?.deductsBalance ?? true,
  defaultAllowance: leaveType?.defaultAllowance ?? 0,
  requiresApproval: leaveType?.requiresApproval ?? true,
  minAdvanceNoticeDays: leaveType?.minAdvanceNoticeDays ?? 0,
  maxDaysPerRequest: leaveType?.maxDaysPerRequest ?? 1,
  allowsPastDates: leaveType?.allowsPastDates ?? false,
  periodType: leaveType?.periodType ?? "NONE",
  maxRequestsPerPeriod: leaveType?.maxRequestsPerPeriod ?? "",
  allowsCarryForward: leaveType?.allowsCarryForward ?? false,
  maxCarryForwardDays: leaveType?.maxCarryForwardDays ?? "",
});

export const LeaveTypeForm = ({ leaveType }: LeaveTypeFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mutationLoading = useAppSelector((state) => state.leaveTypes.mutationLoading);
  const isEdit = Boolean(leaveType);

  const handleSubmit = async (values: LeaveTypeFormValues) => {
    const payload: CreateLeaveTypePayload = {
      ...values,
      maxRequestsPerPeriod: values.maxRequestsPerPeriod || undefined,
      maxCarryForwardDays:
        values.allowsCarryForward && values.maxCarryForwardDays !== ""
          ? values.maxCarryForwardDays
          : undefined,
    };

    const result = leaveType
      ? await dispatch(updateLeaveTypeThunk({ id: leaveType.id, payload }))
      : await dispatch(createLeaveTypeThunk(payload));

    if (
      createLeaveTypeThunk.fulfilled.match(result) ||
      updateLeaveTypeThunk.fulfilled.match(result)
    ) {
      navigate("/leave-types", { replace: true });
    }
  };

  return (
    <Formik
      initialValues={buildInitialValues(leaveType)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => (
        <Form className="leave-type-form">
          <FormField name="name" label="Name" placeholder="e.g. Sick Leave" />
          <FormField name="description" label="Description" placeholder="Optional description" />
          <FormField
            name="defaultAllowance"
            label="Default Allowance (days)"
            type="number"
            min={0}
            step="any"
          />
          <FormField
            name="maxDaysPerRequest"
            label="Max Days Per Request"
            type="number"
            min={0}
            step="any"
          />
          <FormField
            name="minAdvanceNoticeDays"
            label="Min Advance Notice (days)"
            type="number"
            min={0}
            step={1}
          />
          <SelectField name="periodType" label="Period Type" options={PERIOD_TYPE_OPTIONS} />
          {values.periodType !== "NONE" && (
            <FormField
              name="maxRequestsPerPeriod"
              label="Max Requests Per Period"
              type="number"
              min={1}
              step={1}
            />
          )}

          <CheckboxField name="deductsBalance" label="Deducts from leave balance" />
          <CheckboxField name="requiresApproval" label="Requires approval" />
          <CheckboxField name="allowsPastDates" label="Allows past dates" />
          <CheckboxField name="allowsCarryForward" label="Allows carry forward" />
          {values.allowsCarryForward && (
            <FormField
              name="maxCarryForwardDays"
              label="Max Carry Forward Days"
              type="number"
              min={0}
              step="any"
            />
          )}

          <Button type="submit" isLoading={mutationLoading}>
            {isEdit ? "Save changes" : "Create leave type"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
