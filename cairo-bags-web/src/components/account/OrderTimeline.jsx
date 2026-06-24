import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { getOrderStatusLabel } from "../../constants/orderStatusLabels.js";
import { formatOrderDate } from "../../utils/orderHelpers.js";
import { cn } from "../../utils/cn.js";

export function OrderTimeline({ history = [], className }) {
  const { locale } = useLocale();
  const items = [...history].sort(
    (a, b) => new Date(b.createdAt ?? b.CreatedAt) - new Date(a.createdAt ?? a.CreatedAt)
  );

  if (!items.length) {
    return (
      <p className={cn("text-sm text-brand-muted", className)}>
        {locale === "ar" ? "لا يوجد سجل حالة" : "No status history yet"}
      </p>
    );
  }

  return (
    <ol className={cn("space-y-0", className)}>
      {items.map((entry, index) => {
        const status = entry.newStatus ?? entry.NewStatus;
        const notes = entry.notes ?? entry.Notes;
        const createdAt = entry.createdAt ?? entry.CreatedAt;
        const isLast = index === items.length - 1;

        return (
          <li key={`${status}-${createdAt}-${index}`} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast ? (
              <span
                className="absolute start-[0.4375rem] top-3 h-[calc(100%-0.5rem)] w-px bg-brand-border"
                aria-hidden="true"
              />
            ) : null}
            <span
              className={cn(
                "relative z-[1] mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2",
                index === 0 ? "border-brand-accent bg-brand-accent" : "border-brand-border bg-brand-surface"
              )}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-brand-text">{getOrderStatusLabel(status, locale)}</p>
              {notes ? <p className="mt-1 text-sm text-brand-muted">{notes}</p> : null}
              <p className="mt-1 text-xs text-brand-muted">{formatOrderDate(createdAt, locale)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
