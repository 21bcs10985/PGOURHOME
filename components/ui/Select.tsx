import React from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, helper, options, placeholder, className, id, ...props },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-xs">
        {label && (
          <label
            htmlFor={selectId}
            className="text-label-md text-on-surface-variant font-medium"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "h-11 w-full rounded-lg border px-md text-body-md text-on-surface appearance-none bg-surface-container-lowest",
            "focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-error focus:border-error"
              : "border-outline-variant",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
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

Select.displayName = "Select";
export default Select;
