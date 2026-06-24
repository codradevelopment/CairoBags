export function getNotificationId(notification) {
  return notification?.id ?? notification?.Id;
}

export function getNotificationLink(notification, { adminContext = false } = {}) {
  const deepLink = notification?.deepLink ?? notification?.DeepLink;
  const targetType = notification?.targetType ?? notification?.TargetType;

  if (adminContext) {
    if (
      targetType === "AdminPayments" ||
      targetType === "OrderPayment" ||
      deepLink?.includes("/payment")
    ) {
      return "/admin/payments";
    }
    if (deepLink?.startsWith("/admin/")) {
      return deepLink;
    }
  }

  if (deepLink) {
    if (deepLink.startsWith("/orders/")) {
      return deepLink.replace("/orders/", "/account/orders/");
    }
    return deepLink;
  }

  const referenceId = notification?.referenceId ?? notification?.ReferenceId;
  if (targetType === "Order" && referenceId) {
    return `/account/orders/${referenceId}`;
  }
  return null;
}

export function formatNotificationDate(value, locale = "en") {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
