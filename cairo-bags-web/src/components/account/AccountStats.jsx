import { Card, CardBody } from "../ui/Card.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

export function AccountStats({ ordersCount = 0, unreadCount = 0, className }) {
  const { locale } = useLocale();

  const stats = [
    {
      label: locale === "ar" ? "الطلبات" : "Orders",
      value: ordersCount,
    },
    {
      label: locale === "ar" ? "إشعارات غير مقروءة" : "Unread",
      value: unreadCount,
      accent: true,
    },
  ];

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {stats.map((stat) => (
        <Card key={stat.label} variant="flat" padding="md">
          <CardBody>
            <p className="text-xs font-medium tracking-[0.15em] text-brand-muted uppercase">
              {stat.label}
            </p>
            <p
              className={cn(
                "mt-2 font-display text-3xl font-medium",
                stat.accent ? "text-brand-accent" : "text-brand-text"
              )}
            >
              {stat.value}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
