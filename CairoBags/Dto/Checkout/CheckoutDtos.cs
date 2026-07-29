using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Payments;

namespace CairoBags.Dto.Checkout;

public class CheckoutRequest
{
    [Required]
    public int ShippingAddressId { get; set; }

    [Required]
    public PaymentMethodType PaymentMethod { get; set; }

    [MaxLength(32)]
    public string? CouponCode { get; set; }

    [MaxLength(1000)]
    public string? Notes { get; set; }
}

public class CheckoutResponseDto
{
    public int OrderId { get; set; }

    public string OrderNumber { get; set; } = string.Empty;

    public decimal SubTotal { get; set; }

    public decimal DiscountAmount { get; set; }

    public decimal ShippingFee { get; set; }

    public decimal TotalAmount { get; set; }

    public string PaymentMethod { get; set; } = string.Empty;

    public string PaymentStatus { get; set; } = string.Empty;

    public string OrderStatus { get; set; } = string.Empty;

    public string NextStepMessage { get; set; } = string.Empty;
}
