/**
 * Item dalam keranjang.
 *
 * Catatan: produk digital di Selvo dijual sebagai lisensi tunggal per pembeli,
 * sehingga tidak ada konsep `quantity`. Identitas item = `productId`.
 */
export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  thumbnail: string | null;
  sellerName?: string | null;
  categoryName?: string | null;
}
