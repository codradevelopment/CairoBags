import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccountLayout } from "../../layouts/AccountLayout.jsx";
import { usePageTitle } from "../../hooks/usePageTitle.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNotifications } from "../../context/NotificationContext.jsx";
import { useLocale } from "../../components/layout/LanguageSwitcher.jsx";
import * as orderService from "../../services/orderService.js";
import {
  AccountStats,
  OrderCard,
  EmptyOrders,
} from "../../components/account/index.js";
import { Button, Card, CardBody, CardHeader, Skeleton } from "../../components/ui/index.js";

export function AccountDashboardPage() {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const { locale } = useLocale();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const title = locale === "ar" ? "حسابي" : "My Account";
  usePageTitle(title);

  const greeting =
    locale === "ar"
      ? `مرحباً، ${user?.name || user?.userName || ""}`
      : `Welcome, ${user?.name || user?.userName || "Guest"}`;

  useEffect(() => {
    orderService
      .getMyOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const recentOrders = orders.slice(0, 3);

  const quickActions = [
    { to: "/shop", label: locale === "ar" ? "تسوق" : "Shop", variant: "accent" },
    { to: "/account/orders", label: locale === "ar" ? "طلباتي" : "My Orders", variant: "outline" },
    { to: "/account/notifications", label: locale === "ar" ? "الإشعارات" : "Notifications", variant: "outline" },
    { to: "/account/profile", label: locale === "ar" ? "الملف الشخصي" : "Profile", variant: "outline" },
  ];

  return (
    <AccountLayout activeKey="overview" title={title}>
      <div className="space-y-8">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">
            {locale === "ar" ? "مجموعة القاهرة" : "Cairo Collection"}
          </p>
          <h2 className="mt-2 font-display text-2xl font-medium text-brand-text md:text-3xl">
            {greeting}
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            {locale === "ar"
              ? "إدارة طلباتك وإشعاراتك من مكان واحد"
              : "Manage your orders and notifications in one place"}
          </p>
        </div>

        <AccountStats ordersCount={orders.length} unreadCount={unreadCount} />

        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link key={action.to} to={action.to}>
              <Button variant={action.variant} size="sm">
                {action.label}
                {action.to === "/account/notifications" && unreadCount > 0
                  ? ` (${unreadCount})`
                  : ""}
              </Button>
            </Link>
          ))}
        </div>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-display text-xl font-medium text-brand-text">
              {locale === "ar" ? "أحدث الطلبات" : "Recent Orders"}
            </h3>
            <Link to="/account/orders" className="text-sm text-brand-accent hover:text-brand-primary">
              {locale === "ar" ? "عرض الكل" : "View all"}
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full rounded-lg" />
              ))}
            </div>
          ) : null}

          {!loading && recentOrders.length === 0 ? <EmptyOrders /> : null}

          {!loading && recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <OrderCard key={order.orderId ?? order.OrderId} order={order} />
              ))}
            </div>
          ) : null}
        </section>

        {unreadCount > 0 ? (
          <Card variant="flat" padding="md">
            <CardHeader
              title={locale === "ar" ? "إشعارات جديدة" : "New Notifications"}
              subtitle={
                locale === "ar"
                  ? `لديك ${unreadCount} إشعار غير مقروء`
                  : `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
              }
            />
            <CardBody>
              <Link to="/account/notifications">
                <Button variant="accent" size="sm">
                  {locale === "ar" ? "عرض الإشعارات" : "View notifications"}
                </Button>
              </Link>
            </CardBody>
          </Card>
        ) : null}
      </div>
    </AccountLayout>
  );
}
