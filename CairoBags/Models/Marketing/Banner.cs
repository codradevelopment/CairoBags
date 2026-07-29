using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Marketing;

public class Banner : BaseEntity
{
    public BannerPosition Position { get; set; }

    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? MobileImageUrl { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    [MaxLength(500)]
    public string? ButtonUrl { get; set; }

    public virtual ICollection<BannerTranslation> Translations { get; set; } = new List<BannerTranslation>();
}
