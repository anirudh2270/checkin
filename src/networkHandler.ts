import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import type { ValidationErrorResponse } from "./types";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000,
  headers: {},
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const errorHandlers: Record<string, (error: AxiosError) => void> = {
  VALIDATION_ERROR: (error) => {
    const data = error.response?.data as ValidationErrorResponse;
    data.errors?.forEach((err) => toast.error(err.message));
  },
  FORBIDDEN: (error) => {
    const data = error.response?.data as ValidationErrorResponse;
    toast.error(data.message);
  },
  NOT_FOUND: (error) => {
    const data = error.response?.data as ValidationErrorResponse;
    toast.error(data.message);
  },
  INTERNAL_SERVER_ERROR: (error) => {
    const data = error.response?.data as ValidationErrorResponse;
    toast.error(data.message);
  },
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = error?.response?.data?.code;
    if (code && errorHandlers[code]) {
      errorHandlers[code](error);
    } else {
      toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
  },
);

export function PostRequest(params: { url: string; data: object }) {
  return axiosInstance.post(params.url, params.data);
}
