import { forwardRef } from "react";
import { cn } from "../../utils/cn.js";

const variants = {
  primary:
    "bg-brand-primary text-brand-secondary border border-brand-primary hover:bg-brand-text hover:border-brand-text focus-visible:ring-brand-accent disabled:opacity-50",
  secondary:
    "bg-brand-secondary text-brand-text border border-brand-border hover:bg-brand-background focus-visible:ring-brand-accent disabled:opacity-50",
  outline:
    "bg-transparent text-brand-text border border-brand-primary hover:bg-brand-primary hover:text-brand-secondary focus-visible:ring-brand-accent disabled:opacity-50",
  ghost:
    "bg-transparent text-brand-text border border-transparent hover:bg-brand-secondary focus-visible:ring-brand-accent disabled:opacity-50",
  accent:
    "bg-brand-accent text-brand-primary border border-brand-accent hover:bg-brand-accent-muted focus-visible:ring-brand-primary disabled:opacity-50",
  danger:
    "bg-red-800 text-white border border-red-800 hover:bg-red-900 focus-visible:ring-red-600 disabled:opacity-50",
};

const sizes = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  icon: "h-10 w-10 p-0",
};

export const Button = forwardRef(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    type = "button",
    loading = false,
    disabled,
    children,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium tracking-wide transition-all duration-fast",
        "disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span className="sr-only">Loading</span>
        </>
      ) : null}
      {children}
    </button>
  );
});
