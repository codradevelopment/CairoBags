using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Catalog;

public class ProductTranslation : BaseEntity
{
    public int ProductId { get; set; }

    [MaxLength(2)]
    public string LanguageCode { get; set; } = "en";

    [MaxLength(300)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? ShortDescription { get; set; }

    public string? Description { get; set; }

    [MaxLength(250)]
    public string Slug { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? MetaTitle { get; set; }

    [MaxLength(500)]
    public string? MetaDescription { get; set; }

    public virtual Product Product { get; set; } = null!;
}
