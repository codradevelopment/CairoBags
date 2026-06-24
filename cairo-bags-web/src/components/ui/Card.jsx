import { cn } from "../../utils/cn.js";

const variants = {
  default: "bg-brand-surface border border-brand-border",
  elevated: "bg-brand-surface border border-brand-border",
  bordered: "bg-transparent border border-brand-border",
  flat: "bg-brand-secondary border border-transparent",
};

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ className, variant = "default", padding = "md", hover = false, children, ...props }) {
  const baseStyle = {
    boxShadow: "var(--cb-shadow-card)",
    transition: "box-shadow 350ms ease, border-color 350ms ease, transform 350ms ease",
  };

  return (
    <div
      className={cn(
        "rounded-xl transition-all",
        variants[variant],
        paddings[padding],
        hover && "cursor-pointer",
        className
      )}
      style={baseStyle}
      onMouseEnter={
        hover
          ? (e) => {
              e.currentTarget.style.boxShadow = "var(--cb-shadow-hover)";
              e.currentTarget.style.borderColor = "rgba(201, 169, 98, 0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }
          : undefined
      }
      onMouseLeave={
        hover
          ? (e) => {
              e.currentTarget.style.boxShadow = "var(--cb-shadow-card)";
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.transform = "translateY(0)";
            }
          : undefined
      }
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
        {title ? (
          <h3
            className="font-display text-xl font-medium text-brand-text"
            style={{ letterSpacing: "-0.01em" }}
          >
            {title}
          </h3>
        ) : null}
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
      className={cn(
        "mt-6 flex items-center justify-end gap-3 border-t border-brand-border pt-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
