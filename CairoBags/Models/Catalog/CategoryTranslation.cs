using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Catalog;

public class CategoryTranslation : BaseEntity
{
    public int CategoryId { get; set; }

    [MaxLength(2)]
    public string LanguageCode { get; set; } = "en";

    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    [MaxLength(250)]
    public string Slug { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? MetaTitle { get; set; }

    [MaxLength(500)]
    public string? MetaDescription { get; set; }

    public virtual Category Category { get; set; } = null!;
}
