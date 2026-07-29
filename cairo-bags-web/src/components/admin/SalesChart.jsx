import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardBody, CardHeader } from "../ui/Card.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { formatPrice } from "../../utils/productHelpers.js";
import {
  getWeeklySalesData,
  getWeeklySalesTotal,
} from "../../utils/orderHelpers.js";
import { cn } from "../../utils/cn.js";

function SalesTooltip({ active, payload, label, locale }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-brand-border bg-brand-surface px-3 py-2 shadow-card">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
        {label}
      </p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
          {entry.dataKey === "sales"
            ? locale === "ar"
              ? "المبيعات: "
              : "Sales: "
            : locale === "ar"
              ? "الطلبات: "
              : "Orders: "}
          {entry.dataKey === "sales"
            ? formatPrice(entry.value, locale)
            : entry.value}
        </p>
      ))}
    </div>
  );
}

export function SalesChart({ orders = [], loading = false, className }) {
  const { locale } = useLocale();

  const chartData = useMemo(
    () => getWeeklySalesData(orders, locale),
    [orders, locale]
  );
  const weeklyTotal = useMemo(() => getWeeklySalesTotal(orders), [orders]);

  const labels = {
    title: locale === "ar" ? "مبيعات الأسبوع" : "Sales this week",
    total: locale === "ar" ? "إجمالي المبيعات" : "Total sales",
    sales: locale === "ar" ? "المبيعات" : "Sales",
    orders: locale === "ar" ? "الطلبات" : "Orders",
    empty: locale === "ar" ? "لا توجد مبيعات هذا الأسبوع" : "No sales this week yet",
  };

  return (
    <Card variant="default" padding="md" className={cn(className)}>
      <CardHeader
        title={labels.title}
        subtitle={
          loading
            ? "…"
            : `${labels.total}: ${formatPrice(weeklyTotal, locale)}`
        }
      />
      <CardBody>
        {loading ? (
          <div className="flex h-72 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-border border-t-brand-accent" />
          </div>
        ) : chartData.every((item) => item.sales === 0 && item.orders === 0) ? (
          <div className="flex h-72 items-center justify-center text-sm text-brand-muted">
            {labels.empty}
          </div>
        ) : (
          <div className="h-72 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--cb-border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "var(--cb-muted)", fontSize: 12 }}
                  axisLine={{ stroke: "var(--cb-border)" }}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="sales"
                  tick={{ fill: "var(--cb-muted)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
                      notation: "compact",
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                />
                <YAxis
                  yAxisId="orders"
                  orientation="right"
                  allowDecimals={false}
                  tick={{ fill: "var(--cb-muted)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<SalesTooltip locale={locale} />} />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ paddingTop: 16, fontSize: 13 }}
                />
                <Line
                  yAxisId="sales"
                  type="monotone"
                  dataKey="sales"
                  name={labels.sales}
                  stroke="var(--cb-accent)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "var(--cb-accent)", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="orders"
                  type="monotone"
                  dataKey="orders"
                  name={labels.orders}
                  stroke="var(--cb-info)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "var(--cb-info)", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
