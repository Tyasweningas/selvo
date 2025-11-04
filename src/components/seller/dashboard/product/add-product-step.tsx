import { add_product_steps } from "@/data/add-product-steps";
import clsx from "clsx";
import { MdArrowRight } from "react-icons/md";

interface props {
  currentStep: number;
}

const AddProductStep = ({ currentStep }: props) => {
  return (
    <div className="border-bg-div bg-bg-nav mt-5 flex gap-5 rounded-xl border-2 p-5">
      {add_product_steps.map((step, index) => (
        <div key={index} className="flex items-center gap-7">
          <div className="flex items-center gap-3">
            <div
              className={clsx(
                "size-8 rounded-full",
                currentStep >= index ? "bg-primary-blue" : "bg-tertier-netral",
              )}
            >
              <p
                className={clsx(
                  "text-center text-xl leading-9 font-bold",
                  currentStep >= index ? "text-white" : "text-bg-light",
                )}
              >
                {index + 1}
              </p>
            </div>
            <p
              className={clsx(
                "font-semibold",
                currentStep >= index ? "text-white" : "text-tertier-netral",
              )}
            >
              {step.name}
            </p>
          </div>
          {add_product_steps.length - 1 !== index && (
            <MdArrowRight
              className={clsx(
                "size-7",
                currentStep >= index ? "text-white" : "text-tertier-netral",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AddProductStep;
