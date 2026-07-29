import { Badge } from "../ui/Badge.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import {
  getOrderStatusLabel,
  getOrderStatusVariant,
  getPaymentStatusLabel,
  getPaymentStatusVariant,
} from "../../constants/orderStatusLabels.js";
import { cn } from "../../utils/cn.js";

export function StatusBadge({ status, paymentStatus, className }) {
  const { locale } = useLocale();

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {status ? (
        <Badge variant={getOrderStatusVariant(status)} size="sm">
          {getOrderStatusLabel(status, locale)}
        </Badge>
      ) : null}
      {paymentStatus ? (
        <Badge variant={getPaymentStatusVariant(paymentStatus)} size="sm">
          {getPaymentStatusLabel(paymentStatus, locale)}
        </Badge>
      ) : null}
    </div>
  );
}
