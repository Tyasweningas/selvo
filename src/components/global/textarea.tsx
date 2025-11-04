import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`border-bg-light bg-bg-div text-sec-netral focus:ring-primary-blue resize-none rounded-2xl border-2 px-5 py-3 focus:ring-2 focus:outline-none ${className}`}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
