export function getNotificationId(notification) {
  return notification?.id ?? notification?.Id;
}

export function getNotificationLink(notification) {
  const deepLink = notification?.deepLink ?? notification?.DeepLink;
  if (deepLink) {
    if (deepLink.startsWith("/orders/")) {
      return deepLink.replace("/orders/", "/account/orders/");
    }
    return deepLink;
  }

  const targetType = notification?.targetType ?? notification?.TargetType;
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
