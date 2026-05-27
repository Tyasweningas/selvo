"use client";

import Button from "@/components/global/button";
import AddProductDescription from "@/components/seller/dashboard/product/add-product-description";
import AddProductGeneral from "@/components/seller/dashboard/product/add-product-general";
import AddProductReview from "@/components/seller/dashboard/product/add-product-review";
import AddProductSpesification from "@/components/seller/dashboard/product/add-product-spesification";
import AddProductStep from "@/components/seller/dashboard/product/add-product-step";
import { add_product_steps } from "@/data/add-product-steps";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import {
  CreateProductFormValues,
  createProductSchema,
  REQUIRED_PRODUCT_IMAGE_COUNT,
} from "@/lib/validation/product.schema";
import productService from "@/services/product.service";
import { CreateProductPayload } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FieldPath, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const stepFields: Record<number, FieldPath<CreateProductFormValues>[]> = {
  0: ["name", "categoryId"],
  1: ["description", "price"],
  2: ["images", "details"],
  3: [],
};

const AddProductPage = () => {
  const [step, setStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const method = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      price: undefined,
      productLink: "",
      keywords: [],
      images: Array.from({ length: REQUIRED_PRODUCT_IMAGE_COUNT }, () => null),
      details: [
        {
          id: "default-1",
          key: "Ukuran (contoh)",
          value: "Masukkan ukuran",
        },
      ],
    },
  });

  const isEndStep = step === add_product_steps.length - 1;

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleNext = async () => {
    const fieldsToValidate = stepFields[step] ?? [];
    const isValid =
      fieldsToValidate.length === 0
        ? true
        : await method.trigger(fieldsToValidate, { shouldFocus: true });

    if (!isValid) {
      const errors = method.formState.errors;
      const firstError = fieldsToValidate
        .map((field) => {
          const error = errors[field as keyof typeof errors];
          return error && "message" in error
            ? (error.message as string | undefined)
            : undefined;
        })
        .find((message): message is string => Boolean(message));

      toast.error(firstError ?? "Mohon lengkapi semua field yang diperlukan");
      return;
    }

    if (isEndStep) {
      await handleSubmit();
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    const isValid = await method.trigger(undefined, { shouldFocus: true });

    if (!isValid) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = method.getValues();
      const images = (formData.images ?? []).filter(
        (item): item is File => item instanceof File,
      );

      const payload: CreateProductPayload = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        categoryId: formData.categoryId,
        keywords: formData.keywords ?? [],
        productLink: formData.productLink || undefined,
        details: formData.details,
        images,
      };

      await productService.createProduct(payload);

      toast.success("Produk berhasil ditambahkan!");
    } catch (error) {
      logError(error, "AddProductPage");
      toast.error(formatErrorForDisplay(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <AddProductStep currentStep={step} />

      <FormProvider {...method}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && <AddProductGeneral />}
            {step === 1 && <AddProductDescription />}
            {step === 2 && <AddProductSpesification />}
            {step === 3 && <AddProductReview />}
          </motion.div>
        </AnimatePresence>
      </FormProvider>

      <div className="mt-5 ml-auto flex w-fit gap-5">
        {step > 0 && (
          <Button
            size="sm"
            variant="none"
            onClick={handlePrev}
            disabled={isSubmitting}
          >
            Kembali
          </Button>
        )}
        <Button size="sm" onClick={handleNext} disabled={isSubmitting}>
          {isSubmitting
            ? "Memproses..."
            : isEndStep
              ? "Upload Produk"
              : "Selanjutnya"}
        </Button>
      </div>
    </div>
  );
};

export default AddProductPage;
