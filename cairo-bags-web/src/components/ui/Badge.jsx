import { cn } from "../../utils/cn.js";

const variants = {
  default: "bg-brand-secondary text-brand-text border-brand-border",
  primary: "bg-brand-primary text-brand-secondary border-brand-primary",
  accent: "bg-brand-accent/15 text-brand-text border-brand-accent/30",
  success: "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800",
  warning: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800",
  error: "bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800",
  outline: "bg-transparent text-brand-text border-brand-border",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1 text-sm",
};

export function Badge({ className, variant = "default", size = "md", children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium tracking-wide",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
