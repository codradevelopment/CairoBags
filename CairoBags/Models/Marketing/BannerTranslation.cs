using System.ComponentModel.DataAnnotations;
using CairoBags.Models.Common;

namespace CairoBags.Models.Marketing;

public class BannerTranslation : BaseEntity
{
    public int BannerId { get; set; }

    [MaxLength(2)]
    public string LanguageCode { get; set; } = "en";

    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Subtitle { get; set; }

    [MaxLength(100)]
    public string? ButtonText { get; set; }

    public virtual Banner Banner { get; set; } = null!;
}
