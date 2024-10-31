import axios, { CreateAxiosDefaults, AxiosRequestHeaders } from "axios";

export const apiInstance = (config?: CreateAxiosDefaults) => {
  const api = axios.create(config);
  api.interceptors.request.use((config: any) => {
    return {
      ...config,
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "Content-Type": "application/json",
      } as unknown as AxiosRequestHeaders,
    };
  });
  return api;
};
