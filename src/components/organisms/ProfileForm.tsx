import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Input, Label } from "../atoms";
import { FormField } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAuth } from "../../hooks/useAuth";
import { updateProfileThunk } from "../../store/users/usersThunks";
import type { UpdateProfilePayload } from "../../interface/auth";
import "./ProfileForm.css";

const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, "Minimum 2 characters").required("Name is required"),
});

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  if (!user) return null;

  const initialValues: UpdateProfilePayload = { name: user.name };

  const handleSubmit = async (values: UpdateProfilePayload) => {
    await dispatch(updateProfileThunk(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="profile-form">
          <FormField name="name" label="Name" placeholder="Your name" />

          <div className="form-field">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled />
          </div>

          <div className="form-field">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={user.role} disabled />
          </div>

          <Button type="submit" isLoading={isSubmitting}>
            Save changes
          </Button>
        </Form>
      )}
    </Formik>
  );
};
