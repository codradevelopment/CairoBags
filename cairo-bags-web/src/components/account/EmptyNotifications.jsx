import { Button } from "../ui/Button.jsx";
import { Card, CardBody } from "../ui/Card.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

export function EmptyNotifications({ onRefresh, className }) {
  const { locale } = useLocale();

  return (
    <Card variant="elevated" padding="lg" className={cn("mx-auto max-w-lg text-center", className)}>
      <CardBody>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-secondary text-xl text-brand-accent">
          ◇
        </div>
        <h3 className="font-display text-xl font-medium text-brand-text">
          {locale === "ar" ? "لا توجد إشعارات" : "No notifications"}
        </h3>
        <p className="mt-2 text-sm text-brand-muted">
          {locale === "ar"
            ? "ستظهر تحديثات طلباتك هنا"
            : "Order updates will appear here"}
        </p>
        {onRefresh ? (
          <Button type="button" variant="outline" className="mt-6" onClick={onRefresh}>
            {locale === "ar" ? "تحديث" : "Refresh"}
          </Button>
        ) : null}
      </CardBody>
    </Card>
  );
}
