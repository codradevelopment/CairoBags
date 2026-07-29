import { Skeleton } from "../ui/Skeleton.jsx";
import { cn } from "../../utils/cn.js";

const trendIcons = {
  up: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  down: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
};

export function StatsCard({ label, value, hint, trend, icon, className, loading }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-6 transition-all duration-slow",
        className
      )}
      style={{
        background: "var(--cb-surface)",
        borderColor: "var(--cb-border-subtle)",
        boxShadow: "var(--cb-shadow-card)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--cb-shadow-hover)";
        e.currentTarget.style.borderColor = "rgba(201,169,98,0.3)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--cb-shadow-card)";
        e.currentTarget.style.borderColor = "var(--cb-border-subtle)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Gold top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,98,0.5), transparent)" }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className="text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ color: "var(--cb-muted)" }}
          >
            {label}
          </p>
          {loading ? (
            <Skeleton className="mt-3 h-8 w-16" />
          ) : (
            <p
              className="mt-2 font-display text-3xl font-light"
              style={{ color: "var(--cb-text)", letterSpacing: "-0.03em" }}
            >
              {value}
            </p>
          )}
          {hint ? (
            <p className="mt-1.5 flex items-center gap-1 text-xs" style={{ color: "var(--cb-muted)" }}>
              {trend && (
                <span style={{ color: trend === "up" ? "#2d6a4f" : "#9b2226" }}>
                  {trendIcons[trend]}
                </span>
              )}
              {hint}
            </p>
          ) : null}
        </div>

        {icon && (
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "linear-gradient(135deg, rgba(201,169,98,0.15), rgba(201,169,98,0.06))",
              border: "1px solid rgba(201,169,98,0.2)",
              color: "#c9a962",
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
