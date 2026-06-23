import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreLayout } from "../../layouts/StoreLayout.jsx";
import { usePageTitle } from "../../hooks/usePageTitle.js";
import { useLocale } from "../../components/layout/LanguageSwitcher.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../components/ui/Toast.jsx";
import * as checkoutService from "../../services/checkoutService.js";
import {
  ShippingAddressSelector,
  PaymentMethodSelector,
  CouponInput,
  OrderSummary,
  CheckoutReview,
} from "../../components/checkout/index.js";
import { EmptyCart } from "../../components/cart/index.js";
import { PAYMENT_METHOD } from "../../constants/paymentMethods.js";
import { isWalletPaymentMethod } from "../../constants/paymentMethodOptions.js";
import { formatCheckoutResponse } from "../../utils/cartHelpers.js";
import { getCartItems } from "../../utils/cartHelpers.js";
import { Button, Input, Label, Textarea } from "../../components/ui/index.js";

export function CheckoutPage() {
  const { locale } = useLocale();
  const { cart, itemsCount, refreshCart } = useCart();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const items = getCartItems(cart);

  const [shippingAddressId, setShippingAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.CASH_ON_DELIVERY);
  const [couponCode, setCouponCode] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  usePageTitle(locale === "ar" ? "إتمام الشراء" : "Checkout");

  function handleAddressChange(id, address) {
    setShippingAddressId(id);
    setSelectedAddress(address);
  }

  async function handlePlaceOrder() {
    if (!shippingAddressId) {
      toastError(locale === "ar" ? "اختر عنوان الشحن" : "Please select a shipping address");
      return;
    }
    if (items.length === 0) {
      toastError(locale === "ar" ? "السلة فارغة" : "Your cart is empty");
      return;
    }

    setSubmitting(true);
    try {
      const response = await checkoutService.checkout({
        shippingAddressId,
        paymentMethod,
        couponCode: couponCode || undefined,
        notes: notes.trim() || undefined,
      });
      const result = formatCheckoutResponse(response);
      await refreshCart();
      success(locale === "ar" ? "تم إنشاء الطلب" : "Order placed successfully");

      if (isWalletPaymentMethod(paymentMethod)) {
        navigate(`/checkout/payment/${result.orderId}`, { state: { checkout: result } });
      } else {
        navigate("/checkout/success", { state: { checkout: result } });
      }
    } catch (err) {
      toastError(err.message || (locale === "ar" ? "فشل الطلب" : "Checkout failed"));
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <StoreLayout>
        <EmptyCart />
        <div className="mt-6 text-center">
          <Link to="/shop">
            <Button variant="accent">{locale === "ar" ? "تسوق الآن" : "Shop Now"}</Button>
          </Link>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout contentClassName="!py-6 md:!py-10">
      <h1 className="mb-8 font-display text-3xl font-medium text-brand-text md:text-4xl">
        {locale === "ar" ? "إتمام الشراء" : "Checkout"}
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-8">
          <ShippingAddressSelector value={shippingAddressId} onChange={handleAddressChange} />
          <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
          <CouponInput value={couponCode} onChange={setCouponCode} />

          <div>
            <Label htmlFor="order-notes">
              {locale === "ar" ? "ملاحظات الطلب" : "Order notes"}
            </Label>
            <Textarea
              id="order-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                locale === "ar" ? "تعليمات التوصيل (اختياري)" : "Delivery instructions (optional)"
              }
              className="mt-1.5"
            />
          </div>

          <CheckoutReview
            shippingAddress={selectedAddress}
            paymentMethod={paymentMethod}
            couponCode={couponCode}
            notes={notes}
          />
        </div>

        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <OrderSummary showEstimateNote />
          <Button
            type="button"
            variant="accent"
            size="lg"
            className="w-full"
            loading={submitting}
            onClick={handlePlaceOrder}
            disabled={!shippingAddressId}
          >
            {locale === "ar" ? "تأكيد الطلب" : "Place Order"}
          </Button>
          <p className="text-center text-xs text-brand-muted">
            {locale === "ar"
              ? `${itemsCount} منتج في السلة`
              : `${itemsCount} item${itemsCount === 1 ? "" : "s"} in bag`}
          </p>
        </div>
      </div>
    </StoreLayout>
  );
}
