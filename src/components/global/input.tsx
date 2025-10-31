import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border-bg-light bg-bg-div text-sec-netral focus:ring-primary-blue rounded-full border-2 px-5 py-2 focus:ring-2 focus:outline-none ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
