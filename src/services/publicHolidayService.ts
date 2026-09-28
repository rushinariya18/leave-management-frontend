import type { ApiResponse } from "../interface/api";
import type {
  CreatePublicHolidayPayload,
  PublicHoliday,
  PublicHolidaysListParams,
  UpdatePublicHolidayPayload,
} from "../interface/publicHoliday";
import { axiosInstance } from "./axiosInstance";

export const publicHolidayService = {
  list: (params: PublicHolidaysListParams) =>
    axiosInstance.get<never, ApiResponse<PublicHoliday[]>>("/public-holidays", { params }),

  create: (payload: CreatePublicHolidayPayload) =>
    axiosInstance.post<never, ApiResponse<PublicHoliday>>("/public-holidays", payload),

  update: (id: string, payload: UpdatePublicHolidayPayload) =>
    axiosInstance.patch<never, ApiResponse<PublicHoliday>>(`/public-holidays/${id}`, payload),

  remove: (id: string) =>
    axiosInstance.delete<never, ApiResponse<null>>(`/public-holidays/${id}`),
};
