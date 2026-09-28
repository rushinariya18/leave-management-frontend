import { Form, Formik } from "formik";
import * as Yup from "yup";
import type { CreatePublicHolidayPayload, PublicHoliday } from "../../interface/publicHoliday";
import { Button } from "../atoms";
import { FormField } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  createPublicHolidayThunk,
  updatePublicHolidayThunk,
} from "../../store/publicHolidays/publicHolidaysThunks";

const validationSchema = Yup.object({
  date: Yup.string().required("Date is required"),
  name: Yup.string().trim().min(2, "Minimum 2 characters").required("Name is required"),
});

interface PublicHolidayFormProps {
  holiday?: PublicHoliday;
  onSuccess: () => void;
}

export const PublicHolidayForm = ({ holiday, onSuccess }: PublicHolidayFormProps) => {
  const dispatch = useAppDispatch();
  const mutationLoading = useAppSelector((state) => state.publicHolidays.mutationLoading);
  const isEdit = Boolean(holiday);

  const initialValues: CreatePublicHolidayPayload = {
    date: holiday?.date.slice(0, 10) ?? "",
    name: holiday?.name ?? "",
  };

  const handleSubmit = async (values: CreatePublicHolidayPayload) => {
    const result = holiday
      ? await dispatch(updatePublicHolidayThunk({ id: holiday.id, payload: values }))
      : await dispatch(createPublicHolidayThunk(values));

    if (
      createPublicHolidayThunk.fulfilled.match(result) ||
      updatePublicHolidayThunk.fulfilled.match(result)
    ) {
      onSuccess();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form className="public-holiday-form">
        <FormField name="date" label="Date" type="date" />
        <FormField name="name" label="Name" placeholder="e.g. New Year's Day" />
        <Button type="submit" isLoading={mutationLoading}>
          {isEdit ? "Save changes" : "Add holiday"}
        </Button>
      </Form>
    </Formik>
  );
};
