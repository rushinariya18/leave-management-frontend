export interface PublicHoliday {
  id: string;
  date: string;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePublicHolidayPayload {
  date: string;
  name: string;
}

export type UpdatePublicHolidayPayload = Partial<CreatePublicHolidayPayload>;

export interface PublicHolidaysListParams {
  year?: string;
}
