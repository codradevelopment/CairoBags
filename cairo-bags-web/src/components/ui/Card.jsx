import { cn } from "../../utils/cn.js";

const variants = {
  default: "bg-brand-surface border border-brand-border shadow-card",
  elevated: "bg-brand-surface border border-brand-border shadow-soft",
  bordered: "bg-transparent border border-brand-border",
  flat: "bg-brand-secondary border border-transparent",
};

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ className, variant = "default", padding = "md", children, ...props }) {
  return (
    <div
      className={cn("rounded-lg transition-shadow duration-fast", variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, title, subtitle, action, children, ...props }) {
  return (
    <div className={cn("mb-4 flex items-start justify-between gap-4", className)} {...props}>
      <div className="min-w-0 flex-1">
        {title ? <h3 className="font-display text-xl font-medium text-brand-text">{title}</h3> : null}
        {subtitle ? <p className="mt-1 text-sm text-brand-muted">{subtitle}</p> : null}
        {children}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn("text-brand-text", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn("mt-6 flex items-center justify-end gap-3 border-t border-brand-border pt-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
