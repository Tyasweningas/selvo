"use client";

import Button from "@/components/global/button";
import AddProductDescription from "@/components/seller/dashboard/product/add-product-description";
import AddProductGeneral from "@/components/seller/dashboard/product/add-product-general";
import AddProductReview from "@/components/seller/dashboard/product/add-product-review";
import AddProductSpesification from "@/components/seller/dashboard/product/add-product-spesification";
import AddProductStep from "@/components/seller/dashboard/product/add-product-step";
import { add_product_steps } from "@/data/add-product-steps";
import { useState } from "react";

const AddProductPage = () => {
  const [step, setStep] = useState<number>(0);

  const isEndStep = step === add_product_steps.length - 1;

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isEndStep) return;
    setStep((prev) => prev + 1);
  };

  return (
    <div>
      <AddProductStep currentStep={step} />

      {step === 0 && <AddProductGeneral />}
      {step === 1 && <AddProductDescription />}
      {step === 2 && <AddProductSpesification />}
      {step === 3 && <AddProductReview />}

      <div className="mt-5 ml-auto flex w-fit gap-5">
        {step > 0 && (
          <Button size="sm" variant="none" onClick={handlePrev}>
            Kembali
          </Button>
        )}
        <Button size="sm" onClick={handleNext}>
          {isEndStep ? "Upload Produk " : "Selanjutnya"}
        </Button>
      </div>
    </div>
  );
};

export default AddProductPage;
