import { cn } from "../../utils/cn.js";

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
  xl: "h-14 w-14 border-4",
};

export function Spinner({ className, size = "md", label = "Loading" }) {
  return (
    <div className={cn("inline-flex items-center justify-center", className)} role="status">
      <span
        className={cn(
          "animate-spin rounded-full border-brand-border border-t-brand-primary",
          sizes[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function LoadingOverlay({ show, label = "Loading", className }) {
  if (!show) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] bg-brand-surface/70 backdrop-blur-[1px]",
        className
      )}
    >
      <Spinner size="lg" label={label} />
    </div>
  );
}

export function LoadingPage({ label = "Loading" }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <Spinner size="xl" label={label} />
      <p className="text-sm text-brand-muted">{label}</p>
    </div>
  );
}
