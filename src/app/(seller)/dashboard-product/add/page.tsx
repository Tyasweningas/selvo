"use client";

import Button from "@/components/global/button";
import AddProductDescription from "@/components/seller/dashboard/product/add-product-description";
import AddProductGeneral from "@/components/seller/dashboard/product/add-product-general";
import AddProductReview from "@/components/seller/dashboard/product/add-product-review";
import AddProductSpesification from "@/components/seller/dashboard/product/add-product-spesification";
import AddProductStep from "@/components/seller/dashboard/product/add-product-step";
import { add_product_steps } from "@/data/add-product-steps";
import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import productService from "@/services/product.service";
import { CreateProductPayload } from "@/types/product";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProductPage = () => {
  const [step, setStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const method = useForm<CreateProductPayload>({
    defaultValues: {
      keywords: [],
      images: [],
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
    let isValid = false;

    // Validate current step before proceeding
    if (step === 0) {
      isValid = await method.trigger(["name", "categoryId"]);
    } else if (step === 1) {
      isValid = await method.trigger(["description", "price"]);
    } else if (step === 2) {
      isValid = await method.trigger(["images"]);
    } else if (step === 3) {
      isValid = true; // Review step, no validation needed
    }

    if (!isValid) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    if (isEndStep) {
      await handleSubmit();
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    const isValid = await method.trigger();

    if (!isValid) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = method.getValues();

      console.log("Form Data:", formData);

      // Call API to create product

      await productService.createProduct(formData);

      toast.success("Produk berhasil ditambahkan!");
      // TODO: Redirect to product list or detail page
      // router.push('/dashboard-product');
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
