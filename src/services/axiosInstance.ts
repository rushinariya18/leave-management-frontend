import axios from "axios";
import toast from "react-hot-toast";
import type { ApiErrorResponse } from "../interface/api";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1";

export const axiosInstance = axios.create({ baseURL });

let getToken: () => string | null = () => null;
let onUnauthorized: () => void = () => {};

export const registerAuthAccessors = (accessors: {
  getToken: () => string | null;
  onUnauthorized: () => void;
}) => {
  getToken = accessors.getToken;
  onUnauthorized = accessors.onUnauthorized;
};

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const data: ApiErrorResponse | undefined = error.response?.data;
    const message =
      typeof data?.message === "string"
        ? data.message
        : data?.message
          ? Object.values(data.message).join(", ")
          : "Something went wrong. Please try again.";

    if (error.response?.status === 401) {
      onUnauthorized();
    }

    toast.error(message);
    return Promise.reject(error);
  },
);
