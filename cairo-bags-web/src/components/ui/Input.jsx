import { forwardRef } from "react";
import { cn } from "../../utils/cn.js";

const variants = {
  default:
    "border-brand-border bg-brand-surface text-brand-text placeholder:text-brand-muted focus:border-brand-primary focus:ring-brand-primary/20",
  error:
    "border-red-700 bg-brand-surface text-brand-text placeholder:text-brand-muted focus:border-red-700 focus:ring-red-700/20",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-4 text-base",
};

export const Input = forwardRef(function Input(
  { className, variant = "default", size = "md", type = "text", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full rounded-md border transition-colors duration-fast",
        "focus:outline-none focus:ring-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

export const Textarea = forwardRef(function Textarea(
  { className, variant = "default", rows = 4, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full rounded-md border px-4 py-3 text-sm transition-colors duration-fast",
        "focus:outline-none focus:ring-2",
        "disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[6rem]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

export function Label({ className, required, children, ...props }) {
  return (
    <label
      className={cn("mb-1.5 block text-sm font-medium text-brand-text", className)}
      {...props}
    >
      {children}
      {required ? <span className="ms-1 text-red-700">*</span> : null}
    </label>
  );
}

export function FieldError({ className, children, id }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className={cn("mt-1.5 text-sm text-red-700", className)}>
      {children}
    </p>
  );
}

export function InputGroup({ className, children }) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
