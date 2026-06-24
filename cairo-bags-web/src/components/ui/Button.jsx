import { forwardRef } from "react";
import { cn } from "../../utils/cn.js";

const variants = {
  primary:
    "bg-brand-primary text-brand-secondary border border-brand-primary hover:bg-[#1f1f1f] hover:border-[#1f1f1f] focus-visible:ring-brand-accent disabled:opacity-50 shadow-sm hover:shadow-md",
  secondary:
    "bg-brand-secondary text-brand-text border border-brand-border hover:bg-brand-background focus-visible:ring-brand-accent disabled:opacity-50",
  outline:
    "bg-transparent text-brand-text border border-brand-border hover:border-brand-accent hover:text-brand-accent focus-visible:ring-brand-accent disabled:opacity-50 transition-colors",
  ghost:
    "bg-transparent text-brand-text border border-transparent hover:bg-brand-secondary/60 focus-visible:ring-brand-accent disabled:opacity-50",
  accent:
    "relative overflow-hidden border border-brand-accent text-brand-primary font-medium focus-visible:ring-brand-primary disabled:opacity-50 shadow-sm",
  danger:
    "bg-red-800 text-white border border-red-800 hover:bg-red-900 focus-visible:ring-red-600 disabled:opacity-50",
};

const sizes = {
  sm: "h-9 px-4 text-xs gap-1.5 tracking-wide",
  md: "h-11 px-5 text-sm gap-2 tracking-wide",
  lg: "h-13 px-7 text-sm gap-2 tracking-wider",
  icon: "h-10 w-10 p-0",
};

// Accent button gets its own inline-styled wrapper for the gold shimmer
function AccentButton({ className, size, loading, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-fast",
        "disabled:cursor-not-allowed",
        variants.accent,
        sizes[size],
        className
      )}
      style={{
        background: "linear-gradient(135deg, #c9a962 0%, #e8d5a3 45%, #c9a962 75%, #a8853e 100%)",
        backgroundSize: "250% 100%",
        backgroundPosition: "0% 50%",
        transition: "background-position 400ms ease, box-shadow 200ms ease, transform 150ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundPosition = "100% 50%";
        e.currentTarget.style.boxShadow = "0 0 24px -6px rgba(201, 169, 98, 0.5)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundPosition = "0% 50%";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.transform = "translateY(0)";
      }}
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
}

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

  if (variant === "accent") {
    return (
      <AccentButton
        ref={ref}
        type={type}
        disabled={isDisabled}
        size={size}
        className={className}
        loading={loading}
        {...props}
      >
        {children}
      </AccentButton>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-fast",
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
