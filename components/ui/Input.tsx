import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-xs">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label-md text-on-surface-variant font-medium"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-11 w-full rounded-lg border px-md text-body-md text-on-surface placeholder:text-on-surface-variant/60",
            "focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-error focus:border-error focus:ring-error/30"
              : "border-outline-variant",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-label-sm text-error" role="alert">
            {error}
          </p>
        )}
        {!error && helper && (
          <p className="text-label-sm text-on-surface-variant">{helper}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
