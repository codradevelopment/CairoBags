import { Card, CardBody, CardHeader } from "../ui/Card.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { getOrderStatusLabel, ORDER_STATUS_META } from "../../constants/orderStatusLabels.js";
import { getOrderStatus } from "../../utils/orderHelpers.js";
import { cn } from "../../utils/cn.js";

const STATUS_KEYS = Object.keys(ORDER_STATUS_META);

export function DashboardCharts({ orders = [], className }) {
  const { locale } = useLocale();

  const counts = STATUS_KEYS.map((status) => ({
    status,
    count: orders.filter((order) => getOrderStatus(order) === status).length,
  }));
  const max = Math.max(...counts.map((item) => item.count), 1);
  const totalOrders = orders.length;

  return (
    <Card variant="default" padding="md" className={cn(className)}>
      <CardHeader
        title={locale === "ar" ? "توزيع الطلبات" : "Orders Overview"}
        subtitle={
          totalOrders > 0
            ? locale === "ar"
              ? `${totalOrders} طلب`
              : `${totalOrders} orders`
            : undefined
        }
      />
      <CardBody className="max-h-[28rem] space-y-4 overflow-y-auto cb-scrollbar-thin">
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
