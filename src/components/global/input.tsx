import clsx from "clsx";
import React from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  className?: string;
  variant?: "default" | "colored";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", prefix, suffix, variant = "default", ...props }, ref) => {
    // If prefix or suffix exists, wrap in a container
    if (prefix || suffix) {
      return (
        <div
          className={`border-bg-light bg-bg-div focus-within:ring-primary-blue flex items-center gap-2 rounded-full border-2 px-5 py-2 focus-within:ring-2 ${className}`}
        >
          {prefix && (
            <div className="text-sec-netral flex-shrink-0">{prefix}</div>
          )}
          <input
            ref={ref}
            className="text-sec-netral flex-1 [appearance:textfield] bg-transparent outline-none placeholder:text-gray-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            {...props}
          />
          {suffix && (
            <div className="text-sec-netral flex-shrink-0">{suffix}</div>
          )}
        </div>
      );
    }

    // Default input without prefix/suffix
    return (
      <input
        ref={ref}
        className={clsx(
          "focus:ring-primary-blue [appearance:textfield] rounded-full border-2 px-5 py-2 font-bold focus:ring-2 focus:outline-none",
          "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          className,
          variant === "default" && "border-bg-light bg-bg-div text-sec-netral",
          variant === "colored" &&
            "border-bg-blue text-primary-blue bg-bg-blue text-center",
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
