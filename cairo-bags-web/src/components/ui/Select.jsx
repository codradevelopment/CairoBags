import { forwardRef } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Styled select dropdown that matches the Input component design system.
 * Includes a gold focus ring and consistent border/bg treatment.
 */
export const Select = forwardRef(function Select(
  { className, size = "md", children, style, ...props },
  ref
) {
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-4 text-base",
  };

  return (
    <select
      ref={ref}
      className={cn(
        "w-full cursor-pointer appearance-none rounded-lg border border-brand-border bg-brand-surface text-brand-text transition-all duration-fast",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizes[size],
        className
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(100% - 0.75rem) center",
        paddingRight: "2.5rem",
        boxShadow: "none",
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#c9a962";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201, 169, 98, 0.18)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "none";
        props.onBlur?.(e);
      }}
      {...props}
    >
      {children}
    </select>
  );
});

/**
 * Styled checkbox that matches the design system.
 */
export function Checkbox({ className, label, id, ...props }) {
  return (
    <label
      htmlFor={id}
      className={cn("flex cursor-pointer items-center gap-2.5 text-sm text-brand-text select-none", className)}
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        {...props}
      />
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all duration-fast"
        style={{
          borderColor: props.checked ? "#c9a962" : "var(--cb-border)",
          background: props.checked
            ? "linear-gradient(135deg, #c9a962, #a8853e)"
            : "var(--cb-surface)",
        }}
        aria-hidden="true"
      >
        {props.checked && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}
