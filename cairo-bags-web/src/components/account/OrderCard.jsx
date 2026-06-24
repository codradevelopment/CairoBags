import { Link } from "react-router-dom";
import { Card, CardBody } from "../ui/Card.jsx";
import { OrderStatusBadge } from "./OrderStatusBadge.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import {
  formatOrderDate,
  getOrderCreatedAt,
  getOrderId,
  getOrderItemsCount,
  getOrderNumber,
  getOrderPrimaryImage,
  getOrderStatus,
  getOrderTotal,
  getPaymentStatus,
} from "../../utils/orderHelpers.js";
import { formatPrice } from "../../utils/productHelpers.js";
import { cn } from "../../utils/cn.js";

export function OrderCard({ order, className }) {
  const { locale } = useLocale();
  const orderId = getOrderId(order);
  const orderNumber = getOrderNumber(order);
  const imageUrl = getOrderPrimaryImage(order);

  return (
    <Link to={`/account/orders/${orderId}`} className={cn("group block", className)}>
      <Card variant="elevated" className="transition-shadow group-hover:shadow-soft">
        <CardBody className="flex gap-4 p-4 sm:p-5">
          <div className="h-20 w-16 shrink-0 overflow-hidden rounded-md border border-brand-border bg-brand-secondary sm:h-24 sm:w-20">
            {imageUrl ? (
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center font-display text-brand-muted">CB</div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-medium text-brand-text group-hover:text-brand-accent">
                  {orderNumber}
                </p>
                <p className="mt-1 text-xs text-brand-muted sm:text-sm">
                  {formatOrderDate(getOrderCreatedAt(order), locale)}
                </p>
              </div>
              <OrderStatusBadge
                status={getOrderStatus(order)}
                paymentStatus={getPaymentStatus(order)}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-sm">
              <span className="text-brand-muted">
                {locale === "ar"
                  ? `${getOrderItemsCount(order)} منتج`
                  : `${getOrderItemsCount(order)} item${getOrderItemsCount(order) === 1 ? "" : "s"}`}
              </span>
              <span className="font-medium text-brand-primary">
                {formatPrice(getOrderTotal(order), locale)}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
