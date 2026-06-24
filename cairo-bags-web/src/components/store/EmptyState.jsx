import { Card, CardBody } from "../ui/Card.jsx";
import { cn } from "../../utils/cn.js";

export function EmptyState({ title, description, action, className, icon = "◇" }) {
  return (
    <Card variant="elevated" padding="lg" className={cn("mx-auto max-w-lg text-center", className)}>
      <CardBody>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-secondary text-xl text-brand-accent">
          {icon}
        </div>
        <h3 className="font-display text-xl font-medium text-brand-text">{title}</h3>
        {description ? <p className="mt-2 text-sm text-brand-muted">{description}</p> : null}
        {action ? <div className="mt-6">{action}</div> : null}
      </CardBody>
    </Card>
  );
}
