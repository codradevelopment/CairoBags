namespace CairoBags.Models;

/// <summary>
/// Deep-link target identifiers stored on <see cref="Notification.TargetType"/>.
/// </summary>
public static class NotificationTargetTypes
{
    public const string Order = "Order";
    public const string OrderPayment = "OrderPayment";
    public const string ProductReview = "ProductReview";
    public const string Coupon = "Coupon";
    public const string ProductVariant = "ProductVariant";
    public const string System = "System";
}
