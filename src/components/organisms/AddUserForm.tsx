import { Form, Formik, useField } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import type { CreateUserPayload } from "../../interface/user";
import { Button, ErrorText, Label, Select } from "../atoms";
import type { SelectOption } from "../atoms";
import { FormField, PasswordInput } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { createUserThunk, fetchManagerOptionsThunk } from "../../store/userManagement/userManagementThunks";

const ROLE_OPTIONS: SelectOption[] = [
  { value: "EMPLOYEE", label: "Employee" },
  { value: "MANAGER", label: "Manager" },
  { value: "HR", label: "HR" },
];

const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, "Minimum 2 characters").required("Name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(8, "Minimum 8 characters").required("Password is required"),
  role: Yup.mixed<CreateUserPayload["role"]>()
    .oneOf(["EMPLOYEE", "MANAGER", "HR"], "Role is required")
    .required("Role is required"),
  managerId: Yup.string().uuid("Invalid manager").optional(),
});

const initialValues: CreateUserPayload = {
  name: "",
  email: "",
  password: "",
  role: "EMPLOYEE",
  managerId: undefined,
};

interface SelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

const SelectField = ({ name, label, options, placeholder }: SelectFieldProps) => {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);

  return (
    <div className="form-field">
      <Label htmlFor={name}>{label}</Label>
      <Select id={name} hasError={hasError} options={options} placeholder={placeholder} {...field} />
      <ErrorText>{hasError ? meta.error : undefined}</ErrorText>
    </div>
  );
};

export const AddUserForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mutationLoading = useAppSelector((state) => state.userManagement.mutationLoading);
  const managerOptions = useAppSelector((state) => state.userManagement.managerOptions);

  useEffect(() => {
    if (managerOptions.length === 0) {
      dispatch(fetchManagerOptionsThunk({ limit: "100" }));
    }
  }, [dispatch, managerOptions.length]);

  const managerSelectOptions: SelectOption[] = managerOptions.map((manager) => ({
    value: manager.id,
    label: `${manager.name} (${manager.email})`,
  }));

  const handleSubmit = async (values: CreateUserPayload) => {
    const payload: CreateUserPayload = {
      ...values,
      managerId: values.managerId || undefined,
    };
    const result = await dispatch(createUserThunk(payload));
    if (createUserThunk.fulfilled.match(result)) {
      navigate("/users", { replace: true });
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <FormField name="name" label="Name" placeholder="Full name" />
        <FormField name="email" label="Email" type="email" placeholder="user@company.com" />
        <PasswordInput name="password" label="Password" placeholder="••••••••" />
        <SelectField name="role" label="Role" options={ROLE_OPTIONS} />
        <SelectField
          name="managerId"
          label="Manager"
          options={managerSelectOptions}
          placeholder="No manager"
        />
        <Button type="submit" isLoading={mutationLoading}>
          Create user
        </Button>
      </Form>
    </Formik>
  );
};
