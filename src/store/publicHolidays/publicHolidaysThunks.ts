import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type {
  CreatePublicHolidayPayload,
  PublicHoliday,
  PublicHolidaysListParams,
  UpdatePublicHolidayPayload,
} from "../../interface/publicHoliday";
import { publicHolidayService } from "../../services/publicHolidayService";

export const fetchPublicHolidaysThunk = createAsyncThunk<
  PublicHoliday[],
  PublicHolidaysListParams
>("publicHolidays/fetchPublicHolidays", async (params) => {
  const response = await publicHolidayService.list(params);
  return response.data;
});

export const createPublicHolidayThunk = createAsyncThunk<
  PublicHoliday,
  CreatePublicHolidayPayload
>("publicHolidays/createPublicHoliday", async (payload) => {
  const response = await publicHolidayService.create(payload);
  toast.success(response.message);
  return response.data;
});

export const updatePublicHolidayThunk = createAsyncThunk<
  PublicHoliday,
  { id: string; payload: UpdatePublicHolidayPayload }
>("publicHolidays/updatePublicHoliday", async ({ id, payload }) => {
  const response = await publicHolidayService.update(id, payload);
  toast.success(response.message);
  return response.data;
});

export const deletePublicHolidayThunk = createAsyncThunk<string, string>(
  "publicHolidays/deletePublicHoliday",
  async (id) => {
    const response = await publicHolidayService.remove(id);
    toast.success(response.message);
    return id;
  },
);
