import { Card, CardBody, CardHeader } from "../ui/Card.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { getOrderStatusLabel } from "../../constants/orderStatusLabels.js";
import { ORDER_STATUS } from "../../constants/orderStatus.js";
import { cn } from "../../utils/cn.js";

const STATUS_KEYS = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.AWAITING_PAYMENT,
  ORDER_STATUS.PROCESSING,
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.CANCELLED,
];

export function DashboardCharts({ orders = [], className }) {
  const { locale } = useLocale();

  const counts = STATUS_KEYS.map((status) => ({
    status,
    count: orders.filter((o) => (o.orderStatus ?? o.OrderStatus) === status).length,
  }));
  const max = Math.max(...counts.map((c) => c.count), 1);

  return (
    <Card variant="default" padding="md" className={cn(className)}>
      <CardHeader title={locale === "ar" ? "توزيع الطلبات" : "Orders Overview"} />
      <CardBody className="space-y-4">
        {counts.map((item) => (
          <div key={item.status}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-brand-muted">{getOrderStatusLabel(item.status, locale)}</span>
              <span className="font-medium text-brand-text">{item.count}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-brand-secondary">
              <div
                className="h-full rounded-full bg-brand-accent transition-all"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
