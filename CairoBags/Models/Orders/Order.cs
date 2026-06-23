using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;
using CairoBags.Models.Coupons;
using CairoBags.Models.Identity;
using CairoBags.Models.Payments;

namespace CairoBags.Models.Orders;

public class Order : BaseEntity
{
    public string UserId { get; set; } = string.Empty;

    [MaxLength(32)]
    public string OrderNumber { get; set; } = string.Empty;

    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public decimal SubTotal { get; set; }

    public decimal ShippingFee { get; set; }

    public decimal DiscountAmount { get; set; }

    [MaxLength(32)]
    public string? CouponCode { get; set; }

    public decimal? CouponDiscount { get; set; }

    public decimal TotalAmount { get; set; }

    [MaxLength(3)]
    public string CurrencyCode { get; set; } = "EGP";

    [MaxLength(200)]
    public string ShippingFullName { get; set; } = string.Empty;

    [MaxLength(32)]
    public string ShippingPhoneNumber { get; set; } = string.Empty;

    [MaxLength(100)]
    public string ShippingGovernorate { get; set; } = string.Empty;

    [MaxLength(100)]
    public string ShippingCity { get; set; } = string.Empty;

    [MaxLength(300)]
    public string ShippingAddressLine1 { get; set; } = string.Empty;

    [MaxLength(300)]
    public string? ShippingAddressLine2 { get; set; }

    [MaxLength(20)]
    public string? ShippingPostalCode { get; set; }

    [MaxLength(1000)]
    public string? Notes { get; set; }

    public virtual ApplicationUser User { get; set; } = null!;

    public virtual ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();

    public virtual ICollection<OrderStatusHistory> StatusHistory { get; set; } = new List<OrderStatusHistory>();

    public virtual OrderPayment? Payment { get; set; }

    public virtual CouponUsage? CouponUsage { get; set; }
}
