import apiClient from "@/lib/api-client";
import { BaseResponse } from "@/types/api";
import { CreateProductPayload, Product } from "@/types/product";

/**
 * Product Service
 * Handles all product-related API calls
 */

interface CreateProductResponse extends BaseResponse {
  data: Product;
}

/**
 * Create a new product
 * @param payload - Product data from form
 * @returns Created product data
 */
export const createProduct = async (
  payload: CreateProductPayload,
): Promise<Product> => {
  try {
    // Prepare FormData for file upload
    const formData = new FormData();

    // Add basic fields
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("price", payload.price.toString());
    formData.append("categoryId", payload.categoryId);

    // Add product details as JSON
    if (payload.details && payload.details.length > 0) {
      const details = payload.details.map(({ key, value }) => ({
        key,
        value,
      }));
      formData.append("details", JSON.stringify(details));
    }

    // Add keywords as JSON (if backend supports it)
    // if (payload.keywords && payload.keywords.length > 0) {
    //   formData.append("keywords", JSON.stringify(payload.keywords));
    // }

    // Add product link (can be stored as a detail)
    if (payload.productLink) {
      formData.append("productLink", payload.productLink);
    }

    // Add images
    if (payload.images && payload.images.length > 0) {
      payload.images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });
    }

    // Log FormData contents before sending
    console.log("📦 Creating Product with FormData:");
    console.log({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      details: formData.get("details"),
      productLink: formData.get("productLink"),
      imageCount: payload.images?.length || 0,
      images: payload.images?.map((img) => ({
        name: img.name,
        size: `${(img.size / 1024).toFixed(2)} KB`,
        type: img.type,
      })),
    });

    const response = await apiClient.post<CreateProductResponse>(
      "/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data;
  } catch (error: any) {
    console.error("❌ Create Product Error:", error);
    throw error;
  }
};

/**
 * Alternative: Create product with JSON (if backend doesn't accept FormData)
 * Images would need to be uploaded separately or converted to base64
 */
export const createProductJSON = async (
  payload: CreateProductPayload,
): Promise<Product> => {
  try {
    // First upload images if any
    let imageUrls: string[] = [];
    if (payload.images && payload.images.length > 0) {
      // You'll need to implement uploadImages service
      // imageUrls = await uploadImages(payload.images);
    }

    // Prepare JSON payload
    const jsonPayload = {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      categoryId: payload.categoryId,
      details: payload.details.map(({ key, value }) => ({ key, value })),
      keywords: payload.keywords || [],
      productLink: payload.productLink || null,
      imageUrls: imageUrls,
    };

    const response = await apiClient.post<CreateProductResponse>(
      "/products",
      jsonPayload,
    );

    return response.data.data;
  } catch (error: any) {
    console.error("❌ Create Product Error:", error);
    throw error;
  }
};

/**
 * Get all products for the seller (client-side)
 * @returns List of products
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<BaseResponse & { data: Product[] }>(
      "/products",
    );

    return response.data.data;
  } catch (error: any) {
    console.error("❌ Get Products Error:", error);
    throw error;
  }
};

/**
 * Get product by slug
 * @param slug - Product slug
 * @returns Product detail
 */
export const getProductBySlug = async (slug: string): Promise<Product> => {
  try {
    const response = await apiClient.get<
      BaseResponse & { data: { product: Product } }
    >(`/products/slug/${slug}`);

    return response.data.data.product;
  } catch (error: any) {
    console.error("❌ Get Product By Slug Error:", error);
    throw error;
  }
};

export default {
  createProduct,
  createProductJSON,
  getProducts,
  getProductBySlug,
};
