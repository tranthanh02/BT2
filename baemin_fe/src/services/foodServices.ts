import { apiInstance } from "@/constant/apiInstance";

const api = apiInstance({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});
export const foodServices = {
  getAllFood: async () => api.get<ApiResponse<any>>(`./product/get-food`),
  getFoodById: async (id: string) =>
    api.get<ApiResponse<any>>(`./product/${id}`),
  searchFood: async (query: any) =>
    api.get<ApiResponse<any>>(`./product/search?${query}`),

  getFoodCategories: async () =>
    api.get<ApiResponse<any>>(`./product/categories`),
};
