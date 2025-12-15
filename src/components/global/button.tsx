import clsx from "clsx";

interface props {
  variant?: "primary" | "outline" | "white" | "none";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  onClick,
}: props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "cursor-pointer rounded-full border-2 font-semibold transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        variant === "primary" &&
          "bg-primary-blue border-primary-blue hover:border-secondary-blue hover:bg-secondary-blue text-white shadow-[5px_5px_0_#1086d5]",
        variant === "outline" &&
          "bg-bg-div border-primary-blue hover:bg-bg-blue hover:border-bg-blue text-primary-blue shadow-[5px_5px_0_#17547d] hover:text-white",
        variant === "white" &&
          "border-primary-blue text-primary-blue bg-white shadow-[5px_5px_0_#17547d]",
        variant === "none" &&
          "text-primary-blue border-transparent hover:!translate-x-0 hover:!translate-y-0 hover:underline",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2",
        size === "lg" && "px-6 py-3",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
