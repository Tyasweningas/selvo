import apiClient from "@/lib/api-client";
import { BaseResponse } from "@/types/api";
import { ProductCategory } from "@/types/product";

export const categoryService = {
  /**
   * Get all categories
   * @returns Promise with array of ProductCategory
   */
  getCategories: async (): Promise<ProductCategory[]> => {
    const response =
      await apiClient.get<BaseResponse<ProductCategory[]>>("/categories");
    return response.data.data;
  },
};
