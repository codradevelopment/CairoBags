using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Catalog;
using CairoBags.Models.Common;

namespace CairoBags.Models.Orders;

/// <summary>Immutable line-item snapshot captured at checkout.</summary>
public class OrderItem : BaseEntity
{
    public int OrderId { get; set; }

    public int ProductId { get; set; }

    public int ProductVariantId { get; set; }

    [MaxLength(300)]
    public string ProductNameAr { get; set; } = string.Empty;

    [MaxLength(300)]
    public string ProductNameEn { get; set; } = string.Empty;

    [MaxLength(100)]
    public string ColorNameAr { get; set; } = string.Empty;

    [MaxLength(100)]
    public string ColorNameEn { get; set; } = string.Empty;

    [MaxLength(64)]
    public string Sku { get; set; } = string.Empty;

    public decimal UnitPrice { get; set; }

    public int Quantity { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual ProductVariant ProductVariant { get; set; } = null!;
}
