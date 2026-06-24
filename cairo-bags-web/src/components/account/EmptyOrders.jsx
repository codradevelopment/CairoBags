import { Link } from "react-router-dom";
import { Button } from "../ui/Button.jsx";
import { Card, CardBody } from "../ui/Card.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { cn } from "../../utils/cn.js";

export function EmptyOrders({ className }) {
  const { locale } = useLocale();

  return (
    <Card variant="elevated" padding="lg" className={cn("mx-auto max-w-lg text-center", className)}>
      <CardBody>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-secondary text-xl text-brand-accent">
          ◇
        </div>
        <h3 className="font-display text-xl font-medium text-brand-text">
          {locale === "ar" ? "لا توجد طلبات بعد" : "No orders yet"}
        </h3>
        <p className="mt-2 text-sm text-brand-muted">
          {locale === "ar"
            ? "ابدأ التسوق لاكتشاف مجموعتنا الفاخرة"
            : "Start shopping to discover our luxury collection"}
        </p>
        <Link to="/shop" className="mt-6 inline-block">
          <Button variant="accent">{locale === "ar" ? "تسوق الآن" : "Shop Now"}</Button>
        </Link>
      </CardBody>
    </Card>
  );
}
