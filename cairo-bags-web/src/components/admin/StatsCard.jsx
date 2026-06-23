import { Card, CardBody } from "../ui/Card.jsx";
import { Skeleton } from "../ui/Skeleton.jsx";
import { cn } from "../../utils/cn.js";

export function StatsCard({ label, value, hint, className, loading }) {
  return (
    <Card variant="elevated" padding="md" className={cn(className)}>
      <CardBody>
        <p className="text-xs font-medium tracking-[0.15em] text-brand-muted uppercase">{label}</p>
        {loading ? (
          <Skeleton className="mt-3 h-8 w-16" />
        ) : (
          <p className="mt-2 font-display text-3xl font-medium text-brand-text">{value}</p>
        )}
        {hint ? <p className="mt-1 text-xs text-brand-muted">{hint}</p> : null}
      </CardBody>
    </Card>
  );
}
