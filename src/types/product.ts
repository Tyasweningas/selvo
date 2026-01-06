export enum ProductStatus {
  SUBMISSION = "SUBMISSION",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface ProductCategory {
  productCategoryId: string;
  name: string;
  description?: string | null;
  icon?: string;
}

export interface Seller {
  sellerId: string;
  name: string;
  email: string;
}

export interface ProductDetail {
  productDetailId: string;
  productId: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  productImageId: string;
  productId: string;
  imageUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  productId: string;
  sellerId: string;
  categoryId: string | null;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  totalSold: number;
  status: ProductStatus;
  viewCount: number;
  productLink: string;
  createdAt: string;
  updatedAt: string;
  // Relations (optional, depending on API response)
  seller?: Seller;
  category?: ProductCategory;
  images?: ProductImage[];
  details?: ProductDetail[];
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  // Frontend specific fields
  keywords?: string[]; // Will be stored somewhere else or not stored
  productLink?: string; // Can be stored in ProductDetail
  details: { id: string; key: string; value: string }[]; // Will be converted to ProductDetail[]
  images: File[]; // Will be uploaded and converted to imageUrl strings
}
