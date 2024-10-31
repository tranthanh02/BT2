import { apiInstance } from "@/constant/apiInstance";

const api = apiInstance({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});
export const authServices = {
  login: async (data: any) => api.post<ApiResponse<any>>(`./auth/login`, data),
  register: async (data: any) =>
    api.post<ApiResponse<any>>(`./auth/register`, data),
};
