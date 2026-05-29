/**
 * Ads (iklan) types — sinkron dengan response backend `/api/ads`.
 */
export interface Ads {
  adsId: string;
  sellerId: string;
  productId: string;
  bannerUrl: string;
  targetClick: number;
  totalClick: number;
  totalPurchases: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
  seller?: {
    sellerId: string;
    name: string | null;
    email: string;
  };
  product?: {
    productId: string;
    slug: string;
    name: string;
    price: number;
    status: string;
  };
}

export interface CreateAdsPayload {
  productId: string;
  targetClick: number;
  banner: File;
}
