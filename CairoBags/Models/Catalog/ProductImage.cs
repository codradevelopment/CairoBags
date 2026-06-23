using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Catalog;

public class ProductImage : BaseEntity
{
    public int ProductId { get; set; }

    public int? VariantId { get; set; }

    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? ThumbnailUrl { get; set; }

    [MaxLength(200)]
    public string? AltTextAr { get; set; }

    [MaxLength(200)]
    public string? AltTextEn { get; set; }

    public bool IsPrimary { get; set; }

    public int SortOrder { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual ProductVariant? Variant { get; set; }
}
