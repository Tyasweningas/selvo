import { z } from "zod";

export const REQUIRED_PRODUCT_IMAGE_COUNT = 4;
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const productImageSchema = z
  .instanceof(File, { message: "Foto produk wajib diisi" })
  .refine((file) => file.size > 0, {
    message: "Foto produk tidak boleh kosong",
  })
  .refine((file) => file.type.startsWith("image/"), {
    message: "File harus berupa gambar",
  })
  .refine((file) => file.size <= MAX_IMAGE_SIZE_BYTES, {
    message: "Ukuran foto maksimal 5MB",
  });

const productDetailSchema = z.object({
  id: z.string(),
  key: z.string().trim().min(1, "Label detail wajib diisi"),
  value: z.string().trim().min(1, "Nilai detail wajib diisi"),
});

export const createProductSchema = z.object({
  name: z
    .string({ message: "Nama produk wajib diisi" })
    .trim()
    .min(3, "Nama produk minimal 3 karakter"),
  categoryId: z
    .string({ message: "Kategori produk wajib dipilih" })
    .min(1, "Kategori produk wajib dipilih"),
  description: z
    .string({ message: "Deskripsi produk wajib diisi" })
    .trim()
    .min(20, "Deskripsi minimal 20 karakter"),
  price: z
    .number({ message: "Harga produk wajib diisi" })
    .min(1000, "Harga minimal Rp 1.000"),
  keywords: z.array(z.string().trim().min(1)).optional(),
  productLink: z
    .string()
    .trim()
    .regex(/^https?:\/\/.+/, "Link harus dimulai dengan http:// atau https://")
    .optional()
    .or(z.literal("")),
  details: z
    .array(productDetailSchema)
    .min(1, "Minimal satu detail produk wajib diisi"),
  images: z.array(productImageSchema.nullable()).superRefine((value, ctx) => {
    const validFiles = value.filter(
      (item): item is File => item instanceof File,
    );

    if (validFiles.length < REQUIRED_PRODUCT_IMAGE_COUNT) {
      ctx.addIssue({
        code: "custom",
        message: `Wajib upload ${REQUIRED_PRODUCT_IMAGE_COUNT} foto produk. Saat ini baru ${validFiles.length} foto.`,
      });
    } else if (validFiles.length > REQUIRED_PRODUCT_IMAGE_COUNT) {
      ctx.addIssue({
        code: "custom",
        message: `Maksimal ${REQUIRED_PRODUCT_IMAGE_COUNT} foto produk.`,
      });
    }
  }),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
