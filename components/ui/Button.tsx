import React from "react";
import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary/90 shadow-level-1 active:scale-[0.98]",
  secondary:
    "bg-secondary text-on-secondary hover:bg-secondary/90 shadow-level-1 active:scale-[0.98]",
  outline:
    "border-2 border-secondary text-secondary hover:bg-secondary hover:text-on-secondary active:scale-[0.98]",
  ghost:
    "text-primary hover:bg-primary/10 active:scale-[0.98]",
  danger:
    "bg-error text-on-error hover:bg-error/90 shadow-level-1 active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-md text-label-sm rounded-lg",
  md: "h-11 px-xl text-label-md rounded-lg",
  lg: "h-12 px-xl text-label-md rounded-lg",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Spinner size="sm" className="text-current" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
